import { BigNumber, Signer, utils } from "ethers";
import React, { MutableRefObject, useMemo, useState } from "react";
import "./Invest.scss";
import { Slippage, removeSlippage, useSlippage } from "./Slippage";
import { ValueInput } from "./ValueInput";
import { ValueDisplay, ValueType } from "./ValueDisplay";
import { Balances, SeriesId } from "../balances";
import {
  CAULDRON,
  Contracts,
  getContract,
  getFyToken,
  getPool,
  WETH_ST_ETH_STABLESWAP,
  WST_ETH,
  YIELD_ST_ETH_LEVER,
} from "../contracts";
import { useEffect } from "react";
import { IOracle__factory } from "../contracts/IOracle.sol";
import { zeroPad } from "ethers/lib/utils";
import { FYToken } from "../contracts/YieldStEthLever.sol";
import { SeriesObject } from "../objects/Vault";
import { AssetId, getInvestToken, InvestTokenType, Strategy, Token } from "../objects/Strategy";
import { Loading } from "./Loading";

interface Properties {
  /** Relevant token balances. */
  strategy: Strategy;
  account: Signer;
  contracts: MutableRefObject<Contracts>;
  balances: Balances;
  /** The series that are valid for the selected strategy. */
  series: SeriesObject[];
}

enum ApprovalState {
  Loading,
  ApprovalRequired,
  Transactable,
  DebtTooLow,
  NotEnoughFunds,
  UnknownError,
  Undercollateralized,
  Approving,
  Transacting,
}

const gasPrice = utils.parseUnits("100", "gwei");

const UNITS_LEVERAGE = 2;

/**
 * Compute how much collateral would be generated by investing with these
 * parameters.
 */
const computeStEthCollateral = async (
  baseAmount: BigNumber,
  toBorrow: BigNumber,
  contracts: MutableRefObject<Contracts>,
  account: Signer,
  seriesId: SeriesId
): Promise<BigNumber> => {
  // - netInvestAmount = baseAmount + borrowAmount - fee
  const fyWeth = await getFyToken(seriesId, contracts, account);
  const fee = await fyWeth.flashFee(fyWeth.address, toBorrow);
  const netInvestAmount = baseAmount.add(toBorrow).sub(fee);
  // - sellFyWeth: FyWEth -> WEth
  const pool = await getPool(seriesId, contracts, account);
  const obtainedWEth = await pool.sellFYTokenPreview(netInvestAmount);
  // - stableSwap exchange: WEth -> StEth
  const stableswap = getContract(WETH_ST_ETH_STABLESWAP, contracts, account);
  const boughtStEth = await stableswap.get_dy(0, 1, obtainedWEth);
  // - Wrap: StEth -> WStEth
  const wStEth = getContract(WST_ETH, contracts, account);
  const wrapped = await wStEth.getWstETHByStETH(boughtStEth);
  return wrapped;
};

const cauldronDebt = async (
  contracts: MutableRefObject<Contracts>,
  account: Signer,
  strategy: Strategy
) => {
  const cauldron = getContract(CAULDRON, contracts, account);
  return await cauldron.debt(strategy.baseId, strategy.ilkId);
};

/**
 * Same functionality as the vaultlevel function in cauldron. If this returns
 * a negative number, the vault would be undercollateralized.
 */
const vaultLevel = async (
  ink: BigNumber,
  art: BigNumber,
  contracts: MutableRefObject<Contracts>,
  account: Signer,
  strategy: Strategy
): Promise<BigNumber> => {
  const cauldron = getContract(CAULDRON, contracts, account);
  const spotOracle = await cauldron.spotOracles(
    strategy.baseId,
    strategy.ilkId
  );
  const ratio = BigNumber.from(spotOracle.ratio).mul(
    BigNumber.from(10).pow(12)
  );
  const inkValue = (
    await IOracle__factory.connect(spotOracle.oracle, account).peek(
      utils.concat([strategy.ilkId, zeroPad([], 32 - 6)]),
      utils.concat([strategy.baseId, zeroPad([], 32 - 6)]),
      ink
    )
  ).value;
  return inkValue.sub(art.mul(ratio).div(BigNumber.from(10).pow(18)));
};

export const DEFAULT_LEVERAGE = BigNumber.from(300);

const resolveInvestToken = (
  tokenType: InvestTokenType,
  seriesId: SeriesId,
  contracts: MutableRefObject<Contracts>,
  signer: Signer
) => {
  switch (tokenType) {
    case InvestTokenType.FyToken:
      return getFyToken(seriesId, contracts, signer);
  }
};

export const Invest = ({
  balances,
  contracts,
  strategy,
  account,
  series,
}: Readonly<Properties>) => {
  const [slippage, setSlippage] = useSlippage();
  const [leverage, setLeverage] = useState(DEFAULT_LEVERAGE);
  const [balanceInput, setBalanceInput] = useState(BigNumber.from(0));

  /** The currently selected series id. */
  const [seriesId, setSeriesId] = useState<SeriesId>();
  useEffect(
    () => setSeriesId(series.length === 0 ? undefined : series[0].seriesId),
    [series]
  );

  // Use `useMemo` here because every BigNumber will be different while having
  // the same value. That means that effects will be triggered continuously.
  const totalToInvest = useMemo(
    () => balanceInput.mul(leverage).div(100),
    [balanceInput, leverage]
  );
  const toBorrow = useMemo(
    () => totalToInvest.sub(balanceInput),
    [totalToInvest, balanceInput]
  );

  /** The resulting collateral after having invested. */
  const [stEthCollateral, setStEthCollateral] = useState<
    BigNumber | undefined
  >();
  useEffect(() => {
    if (seriesId === undefined) {
      setStEthCollateral(undefined);
      return;
    }
    if (balanceInput.eq(0)) {
      setStEthCollateral(BigNumber.from(0));
      return;
    }
    let shouldUseResult = true;
    void computeStEthCollateral(
      balanceInput,
      toBorrow,
      contracts,
      account,
      seriesId
    ).then((v) => {
      if (shouldUseResult) setStEthCollateral(v);
    });
    return () => {
      shouldUseResult = false;
    };
  }, [account, balanceInput, contracts, toBorrow, seriesId]);

  /**
   * The minimum collateral that must be obtained when invested. The result of
   */
  const stEthMinCollateral = useMemo(
    () =>
      stEthCollateral === undefined
        ? undefined
        : removeSlippage(stEthCollateral, slippage),
    [stEthCollateral, slippage]
  );

  const [investToken, setInvestToken] = useState<FYToken>();
  useEffect(() => {
    if (seriesId === undefined) setInvestToken(undefined);
    else
      void resolveInvestToken(
        strategy.investToken,
        seriesId,
        contracts,
        account
      ).then((token) => setInvestToken(token));
  }, [strategy, seriesId, contracts, account]);

  /**
   * The approval state represents whether it is currently possible to
   * transact, whether approval is required or whether there is a reason not to
   * transact.
   */
  const [approvalState, setApprovalState] = useState<ApprovalState>(
    ApprovalState.Loading
  );
  const [approvalStateInvalidator, setApprovalStateInvalidator] = useState(0);
  useEffect(() => {
    if (seriesId === undefined) return;
    const balance = balances[seriesId];
    if (
      stEthCollateral === undefined ||
      seriesId === undefined ||
      balance === undefined
    )
      return; // Not loaded. The effect will automatically rerun once defined.

    // If this effect was superceded, this will be false and the state won't be
    // updated by this instance.
    let shouldUseResult = true;
    setApprovalState(ApprovalState.Loading);

    const checkApprovalState = async (): Promise<ApprovalState> => {
      if (investToken === undefined) return ApprovalState.Loading;

      // First check if the debt is too low
      if (totalToInvest.eq(0)) return ApprovalState.DebtTooLow;

      const debt = await cauldronDebt(contracts, account, strategy);
      const minDebt = BigNumber.from(debt.min).mul(
        BigNumber.from(10).pow(debt.dec)
      );
      if (stEthCollateral.lt(minDebt)) return ApprovalState.DebtTooLow;

      // Now check collateralization ratio
      const level = await vaultLevel(
        totalToInvest,
        toBorrow,
        contracts,
        account,
        strategy
      );
      if (level.lt(0)) return ApprovalState.Undercollateralized;

      // Check balance
      if (balanceInput.lt(balance)) return ApprovalState.NotEnoughFunds;

      // Now check for approval
      const approval = await investToken.allowance(
        account.getAddress(),
        strategy.lever
      );
      if (approval.lt(totalToInvest)) return ApprovalState.ApprovalRequired;

      // Finally, use callStatic to assert that the transaction will work
      if (strategy.lever === YIELD_ST_ETH_LEVER) {
        const lever = getContract(strategy.lever, contracts, account);
        try {
          await lever.callStatic.invest(
            balanceInput,
            toBorrow,
            BigNumber.from(0),
            seriesId
          );
        } catch (e) {
          // Checking isn't perfect, so try to parse the failure reason
          if (
            (
              e as { error: { data: { message: string } } }
            ).error.data.message.endsWith("Undercollateralized")
          )
            return ApprovalState.Undercollateralized;
          return ApprovalState.UnknownError;
        }
      }
      return ApprovalState.Transactable;
    };
    void checkApprovalState().then((ap) => {
      if (shouldUseResult) setApprovalState(ap);
    });
    return () => {
      shouldUseResult = false;
    };
  }, [
    account,
    strategy,
    toBorrow,
    totalToInvest,
    stEthCollateral,
    contracts,
    approvalStateInvalidator,
    balanceInput,
    seriesId,
    balances,
    investToken,
  ]);

  const approve = async () => {
    if (investToken === undefined) return; // Loading
    setApprovalState(ApprovalState.Approving);
    const gasLimit = (
      await investToken.estimateGas.approve(strategy.lever, totalToInvest)
    ).mul(2);
    const tx = await investToken.approve(strategy.lever, totalToInvest, {
      gasLimit,
      gasPrice,
    });
    await tx.wait();
    setApprovalStateInvalidator((v) => v + 1);
  };

  const transact = async () => {
    if (stEthMinCollateral === undefined || seriesId === undefined) return; // Not yet loaded!
    setApprovalState(ApprovalState.Transacting);
    if (strategy.lever === YIELD_ST_ETH_LEVER) {
      const lever = getContract(strategy.lever, contracts, account);
      const gasLimit = (
        await lever.estimateGas.invest(
          balanceInput,
          toBorrow,
          stEthMinCollateral,
          seriesId
        )
      ).mul(2);
      const invextTx = await lever.invest(
        balanceInput,
        toBorrow,
        stEthMinCollateral,
        seriesId,
        { gasLimit, gasPrice }
      );
      await invextTx.wait();
    }
    setApprovalStateInvalidator((v) => v + 1);
  };

  let component;
  switch (approvalState) {
    case ApprovalState.Loading:
      component = (
        <input
          key="loading"
          className="button"
          type="button"
          value="Loading..."
          disabled={true}
        />
      );
      break;
    case ApprovalState.Approving:
      component = (
        <input
          key="loading"
          className="button"
          type="button"
          value="Approving..."
          disabled={true}
        />
      );
      break;
    case ApprovalState.Transacting:
      component = (
        <input
          key="loading"
          className="button"
          type="button"
          value="Investing..."
          disabled={true}
        />
      );
      break;
    case ApprovalState.ApprovalRequired:
      component = (
        <input
          key="approve"
          className="button"
          type="button"
          value="Approve"
          onClick={() => void approve()}
        />
      );
      break;
    case ApprovalState.Transactable:
      component = (
        <input
          key="transact"
          className="button"
          type="button"
          value="Transact!"
          onClick={() => void transact()}
        />
      );
      break;
    case ApprovalState.DebtTooLow:
      component = (
        <input
          key="debttoolow"
          className="button"
          type="button"
          value="Debt too low!"
          disabled={true}
        />
      );
      break;
    case ApprovalState.UnknownError:
      component = (
        <input
          key="debttoolow"
          className="button"
          type="button"
          value="Unknown error!"
          disabled={true}
        />
      );
      break;
    case ApprovalState.NotEnoughFunds:
      component = (
        <input
          key="debttoolow"
          className="button"
          type="button"
          value="Not enough funds!"
          disabled={true}
        />
      );
      break;
    case ApprovalState.Undercollateralized:
      component = (
        <input
          key="undercollateralized"
          className="button"
          type="button"
          value="Undercollateralized!"
          disabled={true}
        />
      );
      break;
  }

  // Collect all relevant balances of this strategy.
  const balancesAndDebtElements = [];
  for (const [address, tokenType] of [
    strategy.outToken as [string, AssetId | Token],
  ].concat(series.map((s) => [s.seriesId, getInvestToken(strategy)]))) {
    const balance = balances[address];
    if (balance === undefined) {
      return <Loading/>;
    }
    balancesAndDebtElements.push(
      <ValueDisplay
        key={address}
        label="Balance:"
        valueType={ValueType.Balance}
        token={tokenType}
        value={balance}
      />
    );
  }

  let investTokenBalance: BigNumber | undefined;
  if (seriesId !== undefined) investTokenBalance = balances[seriesId];
  if (investTokenBalance === undefined) return <Loading/>;
  return (
    <div className="invest">
      {balancesAndDebtElements}
      <select
        name="series"
        value={seriesId}
        onChange={(e) => setSeriesId(e.target.value as SeriesId)}
      >
        {series.map((series) => (
          <option key={series.seriesId} value={series.seriesId}>
            {series.seriesId}
          </option>
        ))}
      </select>
      <label htmlFor="invest_amount">Amount to invest:</label>
      <ValueInput
        max={investTokenBalance}
        defaultValue={investTokenBalance}
        onValueChange={(v) => setBalanceInput(v)}
        decimals={18}
      />
      <label htmlFor="leverage">
        Leverage: ({utils.formatUnits(leverage, 2)})
      </label>
      <input
        className="leverage"
        name="leverage"
        type="range"
        min="1.01"
        max="5"
        step="0.01"
        value={utils.formatUnits(leverage, 2)}
        onChange={(el) =>
          setLeverage(utils.parseUnits(el.currentTarget.value, UNITS_LEVERAGE))
        }
      />
      <Slippage value={slippage} onChange={(val: number) => setSlippage(val)} />
      <ValueDisplay
        label="To borrow:"
        token={getInvestToken(strategy)}
        valueType={ValueType.Balance}
        value={toBorrow}
      />
      {component}
    </div>
  );
};
