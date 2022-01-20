import React, { useState } from "react";
import useI18n from "../../hooks/useI18n";
import * as Images from "../../images";
import { useRegister } from "../../hooks/contract";
import {
  CreateWrapper,
  NodeIdInput,
  NodeIdWrapper,
  CreateTip,
  CreateSubmit,
} from "./styled";

const CreateContent: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { $t } = useI18n();
  const [nodeId, setNodeId] = useState("");
  const { loading, fetchRegister } = useRegister(onSuccess);

  return (
    <CreateWrapper>
      <NodeIdWrapper>
        <NodeIdInput onChange={(e) => setNodeId(e.target.value)} />
        <Images.Account />
      </NodeIdWrapper>
      <CreateTip>Learn how to get node id &gt;&gt;</CreateTip>
      <CreateSubmit onClick={() => fetchRegister(nodeId)} disabled={loading}>
        {loading ? (
          <Images.RollingWhite width="20px" height="20px" />
        ) : (
          $t("create")
        )}
      </CreateSubmit>
    </CreateWrapper>
  );
};

export default CreateContent;
