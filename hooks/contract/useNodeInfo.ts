import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { formatEther } from "@ethersproject/units";
import { format } from "../../sdk/web3React";
import { useWeb3Contract } from ".";
import { Info } from "../../config/types";

const defaultInfo = {
  onlineNodes: "--",
  releaseNodes: "--",
  totalBalance: "--",
  totalNodes: "--",
};

export default function useNodeInfo() {
  const [info, setInfo] = useState(defaultInfo);
  const { web3Contract } = useWeb3Contract();

  const fetch = useCallback(async () => {
    try {
      const _info: Info = await web3Contract?.methods.getInfo().call();
      setInfo({
        onlineNodes: format(_info.onlineNodes.toString()),
        releaseNodes: format(_info.releaseNodes.toString()),
        totalBalance: format(formatEther(_info.totalBalance)),
        totalNodes: format(_info.totalNodes.toString()),
      });
    } catch (error) {
      console.log("useNodeInfo: ", error);
      setInfo(defaultInfo);
    }
  }, [web3Contract?.methods]);

  useUpdateEffect(() => {
    fetch();
  }, [fetch]);

  return { info };
}
