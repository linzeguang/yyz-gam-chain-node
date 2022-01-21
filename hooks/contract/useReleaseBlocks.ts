import { useCallback, useState } from "react";
import { secondsToHours, secondsToMinutes } from "date-fns";
import { useUpdateEffect } from "ahooks";
import useNodeFactory from "./useNodeFactory";
import { format } from "../../sdk/web3React";

export default function useReleaseBlocks() {
  const [releaseBlocks, setReleaseBlocks] = useState("--");
  const [releaseTimes, setReleaseTimes] = useState("");
  const { releaseBlocks: fetchReleaseBlocks } = useNodeFactory();

  const fetch = useCallback(async () => {
    try {
      const _releaseBlocks = await fetchReleaseBlocks();
      setReleaseBlocks(format(_releaseBlocks.toString()));

      const day = Math.floor(
        secondsToHours(_releaseBlocks.toNumber() * 3) / 24
      );
      const hours = Math.floor(
        secondsToHours(_releaseBlocks.toNumber() * 3) % 24
      );
      const minutes = Math.floor(
        secondsToMinutes(_releaseBlocks.toNumber() * 3) % 60
      );

      setReleaseTimes(`~${day} days ${hours} h ${minutes} min`);
    } catch (error) {
      console.log("useReleaseBlocks: ", error);
      setReleaseBlocks("--");
      setReleaseTimes("");
    }
  }, [fetchReleaseBlocks]);

  useUpdateEffect(() => {
    fetch();
  }, [fetch]);

  return { releaseBlocks, releaseTimes };
}
