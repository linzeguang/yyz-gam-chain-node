import { Contract } from "@ethersproject/contracts";
import { Provider } from "@ethersproject/providers";
import { Signer } from "@ethersproject/abstract-signer";
import { simpleRpcProvider } from "../web3React";

export const getContract = (
  address: string,
  abi: any,
  signer?: Signer | Provider
) => {
  return new Contract(address, abi, signer ?? simpleRpcProvider);
};
