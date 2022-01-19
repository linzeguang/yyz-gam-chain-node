import { Contract } from '@ethersproject/contracts';

// 获取余额
export const getBalance = async (account: string | Contract) => {
  const provider = window.ethereum;

  if (provider) {
    try {
      if (provider.request) {
        return await provider.request({
          method: 'eth_getBalance',
          params: [account, 'latest'],
        });
      }
    } catch (error) {
      console.error(`Cannot get wallet balance`, error);
    }
  } else {
    console.error(`window.ethereum is undefined`);
  }
};
