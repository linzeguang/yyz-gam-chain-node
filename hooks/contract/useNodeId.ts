import { useCallback, useEffect, useState } from "react";
import { useAccount } from "../../sdk/web3React/hooks";
import useNodeFactory from "./useNodeFactory";

export const initNodeId = "0x0000000000000000000000000000000000000000";

export default function useNodeId() {
  const [nodeId, setNodeId] = useState("--");
  const [loading, setLoading] = useState(false);
  const { account } = useAccount();
  const { investor2nid: fetchNodeId } = useNodeFactory();

  const fetch = useCallback(
    async (_account: string) => {
      setLoading(true);
      try {
        const _nodeId = await fetchNodeId(_account);
        setLoading(false);
        return _nodeId === initNodeId ? "--" : _nodeId;
      } catch (error) {
        setLoading(false);
        return "--";
      }
    },
    [fetchNodeId]
  );

  const init = useCallback(async () => {
    const nid = account && (await fetch(account));
    setNodeId(nid ? nid : "--");
  }, [account, fetch]);

  const search = useCallback(
    async (search: string) => {
      const searchNid = await fetch(search);
      return searchNid;
    },
    [fetch]
  );

  useEffect(() => {
    init();
  }, [init]);

  return { loading, nodeId, fetchNodeId: init, searchNodeId: search };
}
