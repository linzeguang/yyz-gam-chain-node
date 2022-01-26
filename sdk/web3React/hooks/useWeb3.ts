import { useEffect, useState } from "react";
import Web3 from "web3";
import { RPC_URL } from "../config/chains";

export default function useWeb3() {
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    setWeb3(
      new Web3(
        new Web3.providers.HttpProvider(RPC_URL, {
          keepAlive: true,
          withCredentials: false,
          timeout: 20000,
          headers: [
            {
              name: "Access-Control-Allow-Origin",
              value: "*",
            },
          ],
        })
      )
    );
  }, []);

  return web3;
}
