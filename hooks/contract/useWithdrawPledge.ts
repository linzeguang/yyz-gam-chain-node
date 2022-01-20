import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useNodeFactory } from ".";
import { getContractErrorMsg } from "../../sdk/utils";
import useI18n from "../useI18n";

export default function useWithdrawPledge(onSuccess?: () => void) {
  const { $t } = useI18n();
  const { withdrawPledge } = useNodeFactory();
  const [loading, setLoading] = useState(false);

  const fetchWithdrawPledge = useCallback(async () => {
    setLoading(true);
    try {
      const tx = await withdrawPledge();
      const receipt = await tx.wait();
      if (receipt && receipt.status === 1) {
        toast.success($t("withdraw_succ"));
        onSuccess && onSuccess();
        setLoading(false);
      }
    } catch (error) {
      console.log(">>>> withdrawPledge: ", error);
      setLoading(false);
      const errorMsg = getContractErrorMsg(error);
      toast.warn(errorMsg);
    }
  }, [$t, onSuccess, withdrawPledge]);

  return { loading, fetchWithdrawPledge };
}
