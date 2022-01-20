import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { useAccount } from "../../sdk/web3React/hooks";
import useNodeFactory from "./useNodeFactory";

const initNodeId = "0x0000000000000000000000000000000000000000";

export default function useNodeId() {
  const [nodeId, setNodeId] = useState("");
  const { account } = useAccount();
  const { investor2nid: fetchNodeId } = useNodeFactory();

  const fetch = useCallback(
    async (_account?: string, search?: boolean) => {
      const accountParam = _account ?? account;
      if (!accountParam) return "--";
      try {
        const _nodeId = await fetchNodeId(accountParam);

        if (search) return _nodeId === initNodeId ? "--" : _nodeId;

        if (_nodeId === initNodeId) {
          setNodeId("--");
        }
        setNodeId(_nodeId);
      } catch (error) {
        console.log("useNodeId: ", error);
        if (search) return "--";
        setNodeId("--");
      }
    },
    [account, fetchNodeId]
  );

  useUpdateEffect(() => {
    fetch();
  }, [fetch]);

  return { nodeId, fetchNodeId: fetch };
}
