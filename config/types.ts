import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
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
  register: (nid: string) => Promise<any>;
  logout: () => Promise<any>;
  withdrawMint: () => Promise<any>;
  withdrawPledge: () => Promise<any>;
}
