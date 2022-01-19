import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import { format, getBalance } from "..";

export default function useAccount() {
  const { active, account } = useWeb3React();
  const [balance, setBalance] = useState("--");

  useEffect(() => {
    console.log("account: ", account);
    if (account) {
      try {
        getBalance(account).then((balance: any) => {
          setBalance(format(formatEther(balance), 6));
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
