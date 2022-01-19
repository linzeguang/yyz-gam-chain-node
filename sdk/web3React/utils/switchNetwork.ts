import { CHAIN_ID } from "../config/chains";

/**
 * switchNetwork 切换网络
 */
export const switchNetwork = async () => {
  const provider = window.ethereum;
  const chainId = CHAIN_ID;
  if (provider) {
    try {
      provider.request &&
        (await provider.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
            },
          ],
        }));
      return true;
    } catch (error) {
      console.error(`Failed to switch the network in Metamask:`, error);
      return false;
    }
  } else {
    console.error(
      `Can't switch the ${chainId} network on metamask because window.ethereum is undefined`
    );
    return false;
  }
};
