import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useNodeFactory } from ".";
import { getContractErrorMsg } from "../../sdk/utils";
import useI18n from "../useI18n";

export default function useLogout(onSuccess?: () => void) {
  const { $t } = useI18n();
  const { logout } = useNodeFactory();
  const [loading, setLoading] = useState(false);

  const fetchLogout = useCallback(async () => {
    setLoading(true);
    try {
      const tx = await logout();
      const receipt = await tx.wait();
      if (receipt && receipt.status === 1) {
        onSuccess && onSuccess();
        setLoading(false);
        toast.success($t("release_succ"));
      }
    } catch (error) {
      setLoading(false);
      const errorMsg = getContractErrorMsg(error);
      toast.warn(errorMsg);
    }
  }, [$t, logout, onSuccess]);

  return { loading, fetchLogout };
}
