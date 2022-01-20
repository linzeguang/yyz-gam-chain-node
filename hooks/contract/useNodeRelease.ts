import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { formatEther } from "@ethersproject/units";
import useNodeFactory from "./useNodeFactory";
import { format } from "../../sdk/web3React";

const defalutRelease = {
  lockedAsset: "--",
  pendingAsset: "--",
  releaseTime: "--",
};

export default function useNodeRelease(nid: string) {
  const [release, setRelease] = useState(defalutRelease);
  const { getReleaseInfo: fetchRelease } = useNodeFactory();

  const fetch = useCallback(
    async (_nid: string) => {
      try {
        const _release = await fetchRelease(_nid);
        setRelease({
          lockedAsset: format(formatEther(_release.lockedAsset)),
          pendingAsset: format(formatEther(_release.pendingAsset)),
          releaseTime: _release.releaseTime.toString(),
        });
      } catch (error) {
        console.log("useNodeRelease: ", error);
        setRelease(defalutRelease);
      }
    },
    [fetchRelease]
  );

  useUpdateEffect(() => {
    fetch(nid);
  }, [nid, fetch]);

  return { release, fetchRelease: fetch };
}
