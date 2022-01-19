import {
  connectorLocalStorageKey,
  walletLocalStorageKey,
} from '../config/connectors';
import { Connector } from '../types';

/**
 * saveWalletConfig 存储已连接钱包信息
 * @param walletConfig 钱包配置信息
 */
export const saveWalletConfig = (connector: Connector) => {
  window.localStorage.setItem(walletLocalStorageKey, connector.title);
  window.localStorage.setItem(connectorLocalStorageKey, connector.connectorId);
};

/**
 * removeWalletConfig 移除钱包标识
 */
export const removeWalletConfig = () => {
  window.localStorage.removeItem(connectorLocalStorageKey);
};
