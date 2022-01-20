import { useCallback, useEffect, useState } from "react";
import { formatEther } from "@ethersproject/units";
import { format, getBalance } from "../sdk/web3React";

export default function useBalance(address: string) {
  const [balance, setBalance] = useState("");

  const fetch = useCallback(() => {
    getBalance(address).then((balance: any) => {
      setBalance(format(formatEther(balance)));
    });
  }, [address]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { balance };
}
