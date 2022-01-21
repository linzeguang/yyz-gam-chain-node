import { StaticJsonRpcProvider, Provider } from "@ethersproject/providers";

export const simpleRpcProvider = new StaticJsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL
);
