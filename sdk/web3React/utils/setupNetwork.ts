import { chains, CHAIN_ID, CHAIN_IDS } from "../config/chains";

/**
 * setupNetwork 设置网络节点
 */
export const setupNetwork = async () => {
  const provider = window.ethereum;
  const chainId = CHAIN_ID as CHAIN_IDS;
  const chain = chains[chainId];
  if (provider) {
    try {
      provider.request &&
        (await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: chain?.chainName ?? chainId,
              nativeCurrency: chain?.nativeCurrency,
              rpcUrls: [chain?.chainRpc],
              blockExplorerUrls: [chain?.chainBrowser],
            },
          ],
        }));
      return true;
    } catch (error) {
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
  } else {
    console.error(
      `Can't setup the ${chainId} network on metamask because window.ethereum is undefined`
    );
    return false;
  }
};
