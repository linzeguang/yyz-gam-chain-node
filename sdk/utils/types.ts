import { CHAIN_IDS } from "../web3React/config/chains";

export type Address = Record<CHAIN_IDS, string>;

export interface ContractError {
  code: number;
  data?: {
    code: number;
    message: string;
  };
  message: string;
  stack: string;
}
