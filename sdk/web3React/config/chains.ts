import { Chains } from "../types";

export enum CHAIN_IDS {
  GC_TEST = 735,
  BSC = 97,
}

// 链ID
export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID) as CHAIN_IDS;

export const chains: Chains = {
  [CHAIN_IDS.GC_TEST]: {
    chainBrowser: "https://43.132.183.20:4000/",
    chainId: CHAIN_IDS.GC_TEST,
    chainName: "Gamechain test",
    simpleName: "GC_TEST",
    chainRpc: "http://101.32.177.140:7345",
    nativeCurrency: {
      name: "GAM",
      symbol: "GAM",
      decimals: 18,
    },
  },
  [CHAIN_IDS.BSC]: {
    chainBrowser: "https://testnet.bscscan.com/",
    chainId: CHAIN_IDS.BSC,
    chainName: "Binance Smart Chain Testnet",
    simpleName: "BSC",
    chainRpc: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
};

// RPC地址
export const RPC_URL = chains[CHAIN_ID].chainRpc;
