import { Connector } from '../types';
import { Metamask, WalletConnect } from '../images';

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
}

const connectors: Connector[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    priority: 1,
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
    priority: 2,
  },
];

export default connectors;

// 轮询间隔
export const POLLING_INTERVAL = 12000;
export const connectorLocalStorageKey = 'connectorIdv2';
export const walletLocalStorageKey = 'wallet';
