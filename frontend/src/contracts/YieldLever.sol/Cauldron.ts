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

export type BalancesStruct = {
  art: PromiseOrValue<BigNumberish>;
  ink: PromiseOrValue<BigNumberish>;
};

export type BalancesStructOutput = [BigNumber, BigNumber] & {
  art: BigNumber;
  ink: BigNumber;
};

export type VaultStruct = {
  owner: PromiseOrValue<string>;
  seriesId: PromiseOrValue<BytesLike>;
  ilkId: PromiseOrValue<BytesLike>;
};

export type VaultStructOutput = [string, string, string] & {
  owner: string;
  seriesId: string;
  ilkId: string;
};

export type SeriesStruct = {
  fyToken: PromiseOrValue<string>;
  baseId: PromiseOrValue<BytesLike>;
  maturity: PromiseOrValue<BigNumberish>;
};

export type SeriesStructOutput = [string, string, number] & {
  fyToken: string;
  baseId: string;
  maturity: number;
};

export interface CauldronInterface extends utils.Interface {
  functions: {
    "balances(bytes12)": FunctionFragment;
    "debtToBase(bytes6,uint128)": FunctionFragment;
    "give(bytes12,address)": FunctionFragment;
    "series(bytes6)": FunctionFragment;
    "vaults(bytes12)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "balances"
      | "debtToBase"
      | "give"
      | "series"
      | "vaults"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "balances",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "debtToBase",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "give",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "series",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "vaults",
    values: [PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(functionFragment: "balances", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "debtToBase", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "give", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "series", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vaults", data: BytesLike): Result;

  events: {};
}

export interface Cauldron extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CauldronInterface;

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
    balances(
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BalancesStructOutput]>;

    debtToBase(
      seriesId: PromiseOrValue<BytesLike>,
      art: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    give(
      vaultId: PromiseOrValue<BytesLike>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    series(
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[SeriesStructOutput]>;

    vaults(
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[VaultStructOutput]>;
  };

  balances(
    vaultId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BalancesStructOutput>;

  debtToBase(
    seriesId: PromiseOrValue<BytesLike>,
    art: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  give(
    vaultId: PromiseOrValue<BytesLike>,
    receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  series(
    seriesId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<SeriesStructOutput>;

  vaults(
    vaultId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<VaultStructOutput>;

  callStatic: {
    balances(
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BalancesStructOutput>;

    debtToBase(
      seriesId: PromiseOrValue<BytesLike>,
      art: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    give(
      vaultId: PromiseOrValue<BytesLike>,
      receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<VaultStructOutput>;

    series(
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<SeriesStructOutput>;

    vaults(
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<VaultStructOutput>;
  };

  filters: {};

  estimateGas: {
    balances(
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    debtToBase(
      seriesId: PromiseOrValue<BytesLike>,
      art: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    give(
      vaultId: PromiseOrValue<BytesLike>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    series(
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vaults(
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    balances(
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    debtToBase(
      seriesId: PromiseOrValue<BytesLike>,
      art: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    give(
      vaultId: PromiseOrValue<BytesLike>,
      receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    series(
      seriesId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vaults(
      vaultId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}