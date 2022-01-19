import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
import { getAddress, getContract } from "../sdk/utils";
import NodeAbi from "./abi/node-abi.json";
import contracts from "./contracts";
import { NodeContract } from "./types";

export const getNodeAddress = () => {
  return getAddress(contracts.node);
};

export const getNodeContract = (signer?: Signer | Provider) => {
  return getContract(getNodeAddress(), NodeAbi, signer) as NodeContract;
};
