import React from "react";
import useI18n from "../../hooks/useI18n";
import * as Images from "../../images";
import { NoDataText, NoDataWrapper } from "./styled";

const NoData: React.FC = () => {
  const { $t } = useI18n();
  return (
    <NoDataWrapper>
      <Images.NoData />
      <NoDataText>{$t("no_node")}</NoDataText>
    </NoDataWrapper>
  );
};

export default NoData;
