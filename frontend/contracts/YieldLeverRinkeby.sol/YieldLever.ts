/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface YieldLeverInterface extends utils.Interface {
  functions: {
    "doClose(address,bytes12,uint128,uint128,uint128)": FunctionFragment;
    "doInvest(uint256,uint128,uint128,bytes12)": FunctionFragment;
    "doRepay(address,bytes12,uint256,uint128)": FunctionFragment;
    "invest(uint256,uint128,uint128,bytes6)": FunctionFragment;
    "unwind(bytes12,uint256,address,uint128,uint128,bytes6)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "doClose"
      | "doInvest"
      | "doRepay"
      | "invest"
      | "unwind"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "doClose",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "doInvest",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "doRepay",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "invest",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "unwind",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "doClose", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "doInvest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "doRepay", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "invest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unwind", data: BytesLike): Result;

  events: {};
}

export interface YieldLever extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: YieldLeverInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    doClose(
      owner: PromiseOrValue<string>,
      vaultId: PromiseOrValue<BytesLike>,
      base: PromiseOrValue<BigNumberish>,
      ink: PromiseOrValue<BigNumberish>,
      art: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    doInvest(
      investAmount: PromiseOrValue<BigNumberish>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      maxFyAmount: PromiseOrValue<BigNumberish>,
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    doRepay(
      owner: PromiseOrValue<string>,
      vaultId: PromiseOrValue<BytesLike>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      ink: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    invest(
      baseAmount: PromiseOrValue<BigNumberish>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      maxFyAmount: PromiseOrValue<BigNumberish>,
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unwind(
      vaultId: PromiseOrValue<BytesLike>,
      maxAmount: PromiseOrValue<BigNumberish>,
      pool: PromiseOrValue<string>,
      ink: PromiseOrValue<BigNumberish>,
      art: PromiseOrValue<BigNumberish>,
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  doClose(
    owner: PromiseOrValue<string>,
    vaultId: PromiseOrValue<BytesLike>,
    base: PromiseOrValue<BigNumberish>,
    ink: PromiseOrValue<BigNumberish>,
    art: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  doInvest(
    investAmount: PromiseOrValue<BigNumberish>,
    borrowAmount: PromiseOrValue<BigNumberish>,
    maxFyAmount: PromiseOrValue<BigNumberish>,
    vaultId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  doRepay(
    owner: PromiseOrValue<string>,
    vaultId: PromiseOrValue<BytesLike>,
    borrowAmount: PromiseOrValue<BigNumberish>,
    ink: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  invest(
    baseAmount: PromiseOrValue<BigNumberish>,
    borrowAmount: PromiseOrValue<BigNumberish>,
    maxFyAmount: PromiseOrValue<BigNumberish>,
    seriesId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unwind(
    vaultId: PromiseOrValue<BytesLike>,
    maxAmount: PromiseOrValue<BigNumberish>,
    pool: PromiseOrValue<string>,
    ink: PromiseOrValue<BigNumberish>,
    art: PromiseOrValue<BigNumberish>,
    seriesId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    doClose(
      owner: PromiseOrValue<string>,
      vaultId: PromiseOrValue<BytesLike>,
      base: PromiseOrValue<BigNumberish>,
      ink: PromiseOrValue<BigNumberish>,
      art: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    doInvest(
      investAmount: PromiseOrValue<BigNumberish>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      maxFyAmount: PromiseOrValue<BigNumberish>,
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    doRepay(
      owner: PromiseOrValue<string>,
      vaultId: PromiseOrValue<BytesLike>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      ink: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    invest(
      baseAmount: PromiseOrValue<BigNumberish>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      maxFyAmount: PromiseOrValue<BigNumberish>,
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    unwind(
      vaultId: PromiseOrValue<BytesLike>,
      maxAmount: PromiseOrValue<BigNumberish>,
      pool: PromiseOrValue<string>,
      ink: PromiseOrValue<BigNumberish>,
      art: PromiseOrValue<BigNumberish>,
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    doClose(
      owner: PromiseOrValue<string>,
      vaultId: PromiseOrValue<BytesLike>,
      base: PromiseOrValue<BigNumberish>,
      ink: PromiseOrValue<BigNumberish>,
      art: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    doInvest(
      investAmount: PromiseOrValue<BigNumberish>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      maxFyAmount: PromiseOrValue<BigNumberish>,
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    doRepay(
      owner: PromiseOrValue<string>,
      vaultId: PromiseOrValue<BytesLike>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      ink: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    invest(
      baseAmount: PromiseOrValue<BigNumberish>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      maxFyAmount: PromiseOrValue<BigNumberish>,
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unwind(
      vaultId: PromiseOrValue<BytesLike>,
      maxAmount: PromiseOrValue<BigNumberish>,
      pool: PromiseOrValue<string>,
      ink: PromiseOrValue<BigNumberish>,
      art: PromiseOrValue<BigNumberish>,
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    doClose(
      owner: PromiseOrValue<string>,
      vaultId: PromiseOrValue<BytesLike>,
      base: PromiseOrValue<BigNumberish>,
      ink: PromiseOrValue<BigNumberish>,
      art: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    doInvest(
      investAmount: PromiseOrValue<BigNumberish>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      maxFyAmount: PromiseOrValue<BigNumberish>,
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    doRepay(
      owner: PromiseOrValue<string>,
      vaultId: PromiseOrValue<BytesLike>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      ink: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    invest(
      baseAmount: PromiseOrValue<BigNumberish>,
      borrowAmount: PromiseOrValue<BigNumberish>,
      maxFyAmount: PromiseOrValue<BigNumberish>,
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unwind(
      vaultId: PromiseOrValue<BytesLike>,
      maxAmount: PromiseOrValue<BigNumberish>,
      pool: PromiseOrValue<string>,
      ink: PromiseOrValue<BigNumberish>,
      art: PromiseOrValue<BigNumberish>,
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
