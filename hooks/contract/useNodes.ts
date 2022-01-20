import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { formatEther } from "@ethersproject/units";
import useNodeFactory from "./useNodeFactory";
import { format } from "../../sdk/web3React";

const defaultNodes = {
  balanceMint: "--",
  balancePledge: "--",
  balancePledgeDebt: "--",
  blockLastWithdraw: "--",
  blockOnline: "--",
  blockRegister: "--",
  totalMint: "--",
  investor: "--",
};

export default function useNodes(nid: string) {
  const [nodes, setNodes] = useState(defaultNodes);
  const [nodeId, setNodeId] = useState("");
  const [status, setStatus] = useState(0);
  const { nodes: fetchNodes } = useNodeFactory();

  const fetch = useCallback(
    async (_nid: string, refresh?: boolean) => {
      if (_nid === nodeId && !refresh) return;
      try {
        const _nodes = await fetchNodes(_nid);
        setNodeId(_nid);
        setStatus(_nodes.status);
        setNodes({
          balanceMint: format(formatEther(_nodes.balanceMint)),
          balancePledge: format(formatEther(_nodes.balancePledge)),
          balancePledgeDebt: "--",
          blockLastWithdraw: "--",
          blockOnline: _nodes.blockOnline.toString(),
          blockRegister: format(_nodes.blockRegister.toString()),
          totalMint: format(formatEther(_nodes.totalMint)),
          investor: _nodes.investor,
        });
      } catch (error) {
        console.log("useNodes: ", error);
        setNodeId("");
        setStatus(0);
        setNodes(defaultNodes);
      }
    },
    [fetchNodes, nodeId]
  );

  useUpdateEffect(() => {
    if (nid && nid !== "--") {
      fetch(nid);
    } else {
      setNodeId("");
      setStatus(0);
      setNodes(defaultNodes);
    }
  }, [nid, nodeId, fetch]);

  return { nodeId, nodes, status, fetchNodes: fetch };
}
