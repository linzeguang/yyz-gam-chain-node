declare interface Window {
  ethereum?: {
    isMetaMask?: true;
    request?: (...args: any[]) => Promise<void>;
    on?: any;
  };
  MSStream?: any;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CHAIN_ID: string;
    NEXT_PUBLIC_RPC_URL: string;
    NEXT_PUBLIC_CONTRACT_PROXY: string;
  }
}

declare module "*.svg" {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>
  ): React.ReactElement;
}
