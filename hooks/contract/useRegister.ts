import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { isAddress } from "@ethersproject/address";
import { parseUnits } from "@ethersproject/units";
import { useNodeFactory } from ".";
import { getContractErrorMsg } from "../../sdk/utils";
import useI18n from "../useI18n";

export default function useRegister(onSuccess?: () => void) {
  const { $t } = useI18n();
  const { register } = useNodeFactory();
  const [loading, setLoading] = useState(false);

  const fetchRegister = useCallback(
    async (nodeId: string) => {
      if (!isAddress(nodeId)) return toast.warn($t("wrong_input"));
      setLoading(true);
      try {
        const tx = await register(nodeId, {
          value: parseUnits("10000"),
        });
        const receipt = await tx.wait();
        if (receipt?.status === 1) {
          toast.success($t("create_succ"));
          onSuccess && onSuccess();
          setLoading(false);
        }
      } catch (error) {
        console.log(">>>> register: ", error);
        setLoading(false);
        const errorMsg = getContractErrorMsg(error);
        toast.warn(errorMsg);
      }
    },
    [$t, onSuccess, register]
  );

  return { loading, fetchRegister };
}
