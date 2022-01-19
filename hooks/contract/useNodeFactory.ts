import { useMemo } from "react";
import { getNodeContract } from "../../config/utils";
import { useActiveWeb3React } from "../../sdk/web3React/hooks";

export default function useNodeFactory() {
  const { library, account } = useActiveWeb3React();

  return useMemo(
    () =>
      getNodeContract(
        library?.getSigner(account ? account : undefined).connectUnchecked()
      ),
    [account, library]
  );
}
