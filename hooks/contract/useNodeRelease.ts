import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { secondsToHours, secondsToMinutes } from "date-fns";
import { formatEther } from "@ethersproject/units";
import useNodeFactory from "./useNodeFactory";
import { format } from "../../sdk/web3React";

const defalutRelease = {
  lockedAsset: "--",
  pendingAsset: "--",
  releaseTime: "--",
};

export default function useNodeRelease(account: string) {
  const [release, setRelease] = useState(defalutRelease);
  const [loading, setLoading] = useState(false);
  const { getReleaseInfo: fetchRelease } = useNodeFactory();

  const fetch = useCallback(
    async (_account: string) => {
      setLoading(true);
      try {
        const _release = await fetchRelease(_account);
        setLoading(false);
        const day = Math.floor(
          secondsToHours(_release.releaseTime.toNumber() * 3) / 24
        );
        const hours = Math.floor(
          secondsToHours(_release.releaseTime.toNumber() * 3) % 24
        );
        const minutes = Math.floor(
          secondsToMinutes(_release.releaseTime.toNumber() * 3) % 60
        );

        return {
          lockedAsset: format(formatEther(_release.lockedAsset)),
          pendingAsset: format(formatEther(_release.pendingAsset)),
          releaseTime: `~${day} days ${hours} h ${minutes} min`,
        };
      } catch (error) {
        console.log("useNodeRelease: ", error);
        setLoading(false);
        return defalutRelease;
      }
    },
    [fetchRelease]
  );

  const init = useCallback(async () => {
    const releaseInfo = account && account !== "--" && (await fetch(account));
    if (releaseInfo) {
      setRelease(releaseInfo);
    } else {
      setRelease(defalutRelease);
    }
  }, [fetch, account]);

  useUpdateEffect(() => {
    init();
  }, [init]);

  return { loading, release, fetchRelease: init };
}
