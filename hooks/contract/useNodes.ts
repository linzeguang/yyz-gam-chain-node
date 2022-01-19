import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { formatEther } from "@ethersproject/units";
import useNodeFactory from "./useNodeFactory";

const defaultNodes = {
  balanceMint: "--",
  balancePledge: "--",
  balancePledgeDebt: "--",
  blockLastWithdraw: "--",
  blockOnline: "--",
  blockRegister: "--",
  totalMint: "--",
};

export default function useNodes(nid: string) {
  const [nodes, setNodes] = useState(defaultNodes);
  const [nodeId, setNodeId] = useState("");
  const [status, setStatus] = useState(0);
  const { nodes: fetchNodes } = useNodeFactory();

  const fetch = useCallback(async () => {
    try {
      const _nodes = await fetchNodes(nid);
      setNodeId(nid);
      setStatus(_nodes.status);
      setNodes({
        balanceMint: formatEther(_nodes.balanceMint),
        balancePledge: formatEther(_nodes.balancePledge),
        balancePledgeDebt: "--",
        blockLastWithdraw: "--",
        blockOnline: _nodes.blockOnline.toString(),
        blockRegister: _nodes.blockRegister.toString(),
        totalMint: formatEther(_nodes.totalMint),
      });
    } catch (error) {
      console.log("useNodes: ", error);
      setNodes(defaultNodes);
    }
  }, [fetchNodes, nid]);

  useUpdateEffect(() => {
    nid && fetch();
  }, [nid, fetch]);

  return { nodeId, nodes, status, fetchNodes: fetch };
}
