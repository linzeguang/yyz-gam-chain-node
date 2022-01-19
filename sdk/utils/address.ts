import { CHAIN_ID, CHAIN_IDS } from "../web3React/config/chains";
import { Address } from "./types";

export const getAddress = (address: Address) => {
  const _address = address[CHAIN_ID];
  return (_address ? _address : address[CHAIN_IDS.GC_TEST]) as string;
};
