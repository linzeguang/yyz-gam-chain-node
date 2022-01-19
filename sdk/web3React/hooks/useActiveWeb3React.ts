import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { Web3Provider } from "@ethersproject/providers";
import { CHAIN_ID } from "../config/chains";
import { simpleRpcProvider } from "..";

const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library || simpleRpcProvider);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider);
      refEth.current = library;
    }
  }, [library]);

  return {
    chainId: chainId ?? Number(CHAIN_ID),
    library: provider,
    ...web3React,
  };
};

export default useActiveWeb3React;
