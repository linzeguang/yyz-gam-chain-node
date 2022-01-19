import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { CHAIN_ID, RPC_URL } from "../config/chains";
import { ConnectorNames } from "../config/connectors";

export const injected = new InjectedConnector({
  supportedChainIds: [CHAIN_ID],
});

export const walletConnect = new WalletConnectConnector({
  rpc: { [CHAIN_ID]: RPC_URL },
  qrcode: true,
});

export const ConnectorsByName: { [name in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletConnect,
};
