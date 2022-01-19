import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { useAccount } from "../../sdk/web3React/hooks";
import useNodeFactory from "./useNodeFactory";

export default function useNodeId() {
  const [nodeId, setNodeId] = useState("");
  const { account } = useAccount();
  const { investor2nid: fetchNodeId } = useNodeFactory();

  const fetch = useCallback(async () => {
    if (!account) return;
    try {
      const _nodeCost = await fetchNodeId(account);
      setNodeId(_nodeCost);
    } catch (error) {
      console.log("useNodeId: ", error);
      setNodeId("--");
    }
  }, [account, fetchNodeId]);

  useUpdateEffect(() => {
    fetch();
  }, [fetch]);

  return { nodeId };
}
