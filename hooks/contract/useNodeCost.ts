import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { formatEther } from "@ethersproject/units";
import useNodeFactory from "./useNodeFactory";
import { format } from "../../sdk/web3React";

export default function useNodeCost() {
  const [nodeCost, setNodeCost] = useState("--");
  const { nodeCost: fetchNodeCost } = useNodeFactory();

  const fetch = useCallback(async () => {
    try {
      const _nodeCost = await fetchNodeCost();
      setNodeCost(format(formatEther(_nodeCost)));
    } catch (error) {
      console.log("useNodeCost: ", error);
      setNodeCost("--");
    }
  }, [fetchNodeCost]);

  useUpdateEffect(() => {
    fetch();
  }, [fetch]);

  return { nodeCost };
}
