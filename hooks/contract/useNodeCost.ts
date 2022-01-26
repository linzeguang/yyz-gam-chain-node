import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { formatEther } from "@ethersproject/units";
import { format } from "../../sdk/web3React";
import { useWeb3Contract } from ".";
import { BigNumberish } from "@ethersproject/bignumber";

export default function useNodeCost() {
  const [nodeCost, setNodeCost] = useState("--");
  const { web3Contract } = useWeb3Contract();

  const fetch = useCallback(async () => {
    try {
      const _nodeCost: BigNumberish = await web3Contract?.methods
        .nodeCost()
        .call();
      setNodeCost(format(formatEther(_nodeCost)));
    } catch (error) {
      console.log("useNodeCost: ", error);
      setNodeCost("--");
    }
  }, [web3Contract?.methods]);

  useUpdateEffect(() => {
    fetch();
  }, [fetch]);

  return { nodeCost };
}
