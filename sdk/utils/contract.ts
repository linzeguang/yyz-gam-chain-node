import { Contract } from "@ethersproject/contracts";
import { Provider } from "@ethersproject/providers";
import { Signer } from "@ethersproject/abstract-signer";
import { simpleRpcProvider } from "../web3React";
import { getI18n } from "react-i18next";
import { ContractError } from "./types";

export const getContract = (
  address: string,
  abi: any,
  signer?: Signer | Provider
) => {
  return new Contract(address, abi, signer ?? simpleRpcProvider);
};

export const getContractErrorMsg = (error: any) => {
  const i18n = getI18n();
  if (typeof error !== "object") return i18n.t("network");
  const { data, message = "" } = error as ContractError;
  if (data?.code) return i18n.t(`error_${data?.code}`);
  return message || i18n.t("network");
};
