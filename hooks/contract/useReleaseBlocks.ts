import { useCallback, useState } from "react";
import { secondsToHours, secondsToMinutes } from "date-fns";
import { useUpdateEffect } from "ahooks";
import { format } from "../../sdk/web3React";
import { useWeb3Contract } from ".";

export default function useReleaseBlocks() {
  const [releaseBlocks, setReleaseBlocks] = useState("--");
  const [releaseTimes, setReleaseTimes] = useState("");
  const { web3Contract } = useWeb3Contract();

  const fetch = useCallback(async () => {
    try {
      const _releaseBlocks: string = await web3Contract?.methods
        .releaseBlocks()
        .call();
      setReleaseBlocks(format(_releaseBlocks));

      const day = Math.floor(secondsToHours(Number(_releaseBlocks) * 3) / 24);
      const hours = Math.floor(secondsToHours(Number(_releaseBlocks) * 3) % 24);
      const minutes = Math.floor(
        secondsToMinutes(Number(_releaseBlocks) * 3) % 60
      );
      setReleaseTimes(`~${day} days ${hours} h ${minutes} min`);
    } catch (error) {
      console.log("useReleaseBlocks: ", error);
      setReleaseBlocks("--");
      setReleaseTimes("");
    }
  }, [web3Contract?.methods]);

  useUpdateEffect(() => {
    fetch();
  }, [fetch]);

  return { releaseBlocks, releaseTimes };
}
