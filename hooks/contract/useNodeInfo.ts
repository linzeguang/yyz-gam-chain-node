import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { formatEther } from "@ethersproject/units";
import useNodeFactory from "./useNodeFactory";

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
        onlineNodes: _info.onlineNodes.toString(),
        releaseNodes: _info.releaseNodes.toString(),
        totalBalance: formatEther(_info.totalBalance),
        totalNodes: _info.totalNodes.toString(),
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
