import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import {
  TransactionReceipt,
  TransactionResponse,
} from "@ethersproject/providers";
import { AccessList, AccessListish } from "@ethersproject/transactions";
import { Address } from "../sdk/utils";

export interface Contracts {
  [key: string]: Address;
}

export interface Info {
  onlineNodes: BigNumber;
  releaseNodes: BigNumber;
  totalBalance: BigNumber;
  totalNodes: BigNumber;
}

export interface Nodes {
  balanceMint: BigNumber;
  balancePledge: BigNumber;
  balancePledgeDebt: BigNumber;
  blockLastWithdraw: BigNumber;
  blockOnline: BigNumber;
  blockRegister: BigNumber;
  totalMint: BigNumber;
  investor: string;
  nextNode: string;
  nextOnlineNode: string;
  preNode: string;
  preOnlineNode: string;
  status: number;
}

export interface Release {
  lockedAsset: BigNumber;
  pendingAsset: BigNumber;
  releaseTime: BigNumber;
}

export interface NodeContract extends Contract {
  nodeCost: () => Promise<BigNumberish>;
  getInfo: () => Promise<Info>;
  investor2nid: (account: string) => Promise<string>;
  nodes: (nid: string) => Promise<Nodes>;
  getReleaseInfo: (nid: string) => Promise<Release>;
  register: (
    nid: string,
    overrides?: PayableOverrides
  ) => Promise<Promise<ContractTransaction>>;
  logout: () => Promise<any>;
  withdrawMint: () => Promise<Promise<ContractTransaction>>;
  withdrawPledge: () => Promise<Promise<ContractTransaction>>;
}

export interface Overrides {
  gasLimit?: BigNumberish | Promise<BigNumberish>;
  gasPrice?: BigNumberish | Promise<BigNumberish>;
  maxFeePerGas?: BigNumberish | Promise<BigNumberish>;
  maxPriorityFeePerGas?: BigNumberish | Promise<BigNumberish>;
  nonce?: BigNumberish | Promise<BigNumberish>;
  type?: number;
  accessList?: AccessListish;
  customData?: Record<string, any>;
}

export interface PayableOverrides extends Overrides {
  value?: BigNumberish | Promise<BigNumberish>;
}

export interface PopulatedTransaction {
  to?: string;
  from?: string;
  nonce?: number;

  gasLimit?: BigNumber;
  gasPrice?: BigNumber;

  data?: string;
  value?: BigNumber;
  chainId?: number;

  type?: number;
  accessList?: AccessList;

  maxFeePerGas?: BigNumber;
  maxPriorityFeePerGas?: BigNumber;

  customData?: Record<string, any>;
}

export interface ContractReceipt extends TransactionReceipt {
  events?: Array<Event>;
}

export interface ContractTransaction extends TransactionResponse {
  wait(confirmations?: number): Promise<ContractReceipt>;
}
