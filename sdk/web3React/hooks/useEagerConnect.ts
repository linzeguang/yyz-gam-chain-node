import { useEffect, useState } from "react";
import { CHAIN_ID } from "../config/chains";
import connectors, {
  connectorLocalStorageKey,
  ConnectorNames,
} from "../config/connectors";
import useConnect from "./useConnect";

// 自动连接钱包
export default function useEagerConnect() {
  const [netWorkId, setNetWorkId] = useState(CHAIN_ID.toString());
  const { connect, disconnect } = useConnect();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(
      connectorLocalStorageKey
    ) as ConnectorNames;
    const walletConfig = connectors.find(
      (connector) => connector.connectorId === connectorId
    );

    if (connectorId && walletConfig && CHAIN_ID.toString() === netWorkId) {
      console.log("connect");
      connect(walletConfig);
    } else {
      console.log("disconnect");
      disconnect();
    }
  }, [connect, disconnect, netWorkId]);

  useEffect(() => {
    const provider = window.ethereum;
    provider?.on("networkChanged", (chainId: string) => {
      console.log("networkChanged: ", chainId);
      setNetWorkId(chainId);
    });
  }, []);
}
