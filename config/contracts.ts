import { CHAIN_IDS } from "../sdk/web3React/config/chains";
import { Contracts } from "./types";

const { GC_TEST, BSC } = CHAIN_IDS;

const contracts: Contracts = {
  node: {
    [GC_TEST]: "0x1111111111111111111111111111111111111111",
    [BSC]: "",
  },
};

export default contracts;
