import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useNodeFactory } from ".";
import { getContractErrorMsg } from "../../sdk/utils";
import useI18n from "../useI18n";

export default function useWithdrawMint(onSuccess?: () => void) {
  const { $t } = useI18n();
  const { withdrawMint } = useNodeFactory();
  const [loading, setLoading] = useState(false);

  const fetchWithdrawMint = useCallback(async () => {
    setLoading(true);
    try {
      const tx = await withdrawMint();
      const receipt = await tx.wait();
      if (receipt && receipt.status === 1) {
        setLoading(false);
        toast.success($t("withdraw_succ"));
        onSuccess && onSuccess();
      }
    } catch (error) {
      console.log(">>>> withdrawMint: ", error);
      setLoading(false);
      const errorMsg = getContractErrorMsg(error);
      toast.warn(errorMsg);
    }
  }, [$t, onSuccess, withdrawMint]);

  return { loading, fetchWithdrawMint };
}
