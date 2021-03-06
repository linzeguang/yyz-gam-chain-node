import { useCallback, useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { format, getBalance } from "../sdk/web3React";

export default function useBalance(address: string) {
  const [balance, setBalance] = useState("");

  const fetch = useCallback(() => {
    getBalance(address).then((balance: any) => {
      balance && setBalance(format(formatEther(balance), 6));
    });
  }, [address]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { balance };
}
