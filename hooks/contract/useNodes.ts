import { useCallback, useState, useEffect } from "react";
import { toDate, format as formatData } from "date-fns";
import { formatEther } from "@ethersproject/units";
import useNodeFactory from "./useNodeFactory";
import { format, getBlock2Timestamp } from "../../sdk/web3React";
import { initNodeId } from ".";

const defaultNodes = {
  balanceMint: "--",
  balancePledge: "--",
  balancePledgeDebt: "--",
  blockLastWithdraw: "--",
  blockOnline: "--",
  blockOnlineTime: "--",
  blockRegister: "--",
  blockRegisterTime: "--",
  totalMint: "--",
  investor: "--",
};

export default function useNodes(nid: string) {
  const [nodes, setNodes] = useState(defaultNodes);
  const [nodeId, setNodeId] = useState("--");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const { nodes: fetchNodes } = useNodeFactory();

  const fetch = useCallback(
    async (_nid: string) => {
      setLoading(true);
      try {
        if (!_nid || _nid === "--") throw false;
        const _nodes = await fetchNodes(_nid);
        setLoading(false);
        if (_nodes.investor === initNodeId)
          return {
            nodes: defaultNodes,
            status: 0,
            nodeId: "",
          };
        const blockRegisterTime = await getBlock2Timestamp(
          _nodes.blockRegister.toNumber()
        );
        const blockOnlineTime = await getBlock2Timestamp(
          _nodes.blockOnline.toNumber()
        );

        return {
          nodes: {
            balanceMint: format(formatEther(_nodes.balanceMint)),
            balancePledge: format(formatEther(_nodes.balancePledge)),
            balancePledgeDebt: "--",
            blockLastWithdraw: "--",
            blockOnline: _nodes.blockOnline.toString(),
            blockOnlineTime: `${format(
              _nodes.blockOnline.toString()
            )} (~${formatData(
              toDate(blockOnlineTime * 1000),
              "yyyy.MM.dd HH:mm:ss"
            )})`,
            blockRegister: _nodes.blockRegister.toString(),
            blockRegisterTime: `${format(
              _nodes.blockRegister.toString()
            )} (~${formatData(
              toDate(blockRegisterTime * 1000),
              "yyyy.MM.dd HH:mm:ss"
            )})`,
            totalMint: format(formatEther(_nodes.totalMint)),
            investor: _nodes.investor,
          },
          status: _nodes.status,
          nodeId: _nid,
        };
      } catch (error) {
        console.log("useNodes: ", error);
        setLoading(false);
        return {
          nodes: defaultNodes,
          status: 0,
          nodeId: "",
        };
      }
    },
    [fetchNodes]
  );

  const init = useCallback(async () => {
    console.log("useNodes: init >>>>>>>>", nid);

    const res = await fetch(nid);
    if (res) {
      setNodes(res.nodes);
      setNodeId(res.nodeId);
      setStatus(res.status);
    } else {
      setNodes(defaultNodes);
      setNodeId("--");
      setStatus(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nid]);

  const search = useCallback(
    async (searchNid: string) => {
      const searchNodes = await fetch(searchNid);
      setNodes(searchNodes.nodes);
      setNodeId(searchNodes.nodeId);
      setStatus(searchNodes.status);
    },
    [fetch]
  );

  useEffect(() => {
    init();
  }, [init]);

  return {
    loading,
    nodeId,
    nodes,
    status,
    fetchNodes: init,
    searchNodes: search,
  };
}
