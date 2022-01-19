import { CHAIN_IDS } from './config/chains';
import { ConnectorNames } from './config/connectors';

export type Chains = Record<CHAIN_IDS, Chain>;

export interface Chain {
  chainBrowser: string;
  chainId: number;
  chainName: string;
  simpleName: string;
  chainRpc: string;
  nativeCurrency?: {
    name?: string;
    symbol?: string;
    decimals?: number;
  };
}

export interface Connector {
  title: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  connectorId: ConnectorNames;
  priority: number;
}
