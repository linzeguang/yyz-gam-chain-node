import { useCallback, useMemo, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { useWeb3 } from "../../sdk/web3React/hooks";
import NodeAbi from "../../config/abi/node-abi.json";
import { getNodeAddress } from "../../config/utils";
import { formatEther } from "@ethersproject/units";
import { format } from "../../sdk/web3React";

export default function useWeb3Contract() {
  const web3 = useWeb3();
  const [contractBalance, setContractBalance] = useState("");

  const web3Contract = useMemo(() => {
    if (!web3) return null;
    return new web3.eth.Contract(NodeAbi as any, getNodeAddress());
  }, [web3]);

  const fetch = useCallback(async () => {
    try {
      if (!web3) return setContractBalance("");
      const balance = await web3.eth.getBalance(getNodeAddress());
      setContractBalance(format(formatEther(balance), 6));
    } catch (error) {
      setContractBalance("");
    }
  }, [web3]);

  useUpdateEffect(() => {
    fetch();
  }, [fetch]);

  return { web3Contract, contractBalance };
}
