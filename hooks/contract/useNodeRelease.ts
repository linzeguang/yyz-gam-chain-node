import { useCallback, useState } from "react";
import { useUpdateEffect } from "ahooks";
import { formatEther } from "@ethersproject/units";
import useNodeFactory from "./useNodeFactory";

const defalutRelease = {
  lockedAsset: "--",
  pendingAsset: "--",
  releaseTime: "--",
};

export default function useNodeRelease(nid: string) {
  const [release, setRelease] = useState(defalutRelease);
  const { getReleaseInfo: fetchRelease } = useNodeFactory();

  const fetch = useCallback(async () => {
    try {
      const _release = await fetchRelease(nid);
      setRelease({
        lockedAsset: formatEther(_release.lockedAsset),
        pendingAsset: formatEther(_release.pendingAsset),
        releaseTime: _release.releaseTime.toString(),
      });
    } catch (error) {
      console.log("useNodeRelease: ", error);
      setRelease(defalutRelease);
    }
  }, [fetchRelease, nid]);

  useUpdateEffect(() => {
    nid && fetch();
  }, [nid, fetch]);

  return { release, fetchRelease: fetch };
}
