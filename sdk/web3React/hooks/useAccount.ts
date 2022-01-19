import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import { getBalance } from "..";

export default function useAccount() {
  const { active, account } = useWeb3React();
  const [balance, setBalance] = useState("--");

  useEffect(() => {
    console.log("account: ", account);
    if (account) {
      try {
        getBalance(account).then((res: any) => {
          setBalance(formatEther(res));
        });
      } catch {
        setBalance("--");
      }
    } else {
      setBalance("--");
    }
  }, [account]);

  return { active, account, balance };
}
