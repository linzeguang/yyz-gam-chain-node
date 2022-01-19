import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { formatEther } from "@ethersproject/units";
import useNodeFactory from "./useNodeFactory";
import { format } from "../../sdk/web3React";

const defaultInfo = {
  onlineNodes: "--",
  releaseNodes: "--",
  totalBalance: "--",
  totalNodes: "--",
};

export default function useNodeInfo() {
  const [info, setInfo] = useState(defaultInfo);
  const { getInfo: fetchInfo } = useNodeFactory();

  const fetch = useCallback(async () => {
    try {
      const _info = await fetchInfo();
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
  }, [fetchInfo]);

  useUpdateEffect(() => {
    fetch();
  }, [fetch]);

  return { info };
}
