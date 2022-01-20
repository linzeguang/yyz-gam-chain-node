import React from "react";
import { getNodeAddress } from "../../config/utils";
import { useNodeCost, useNodeInfo } from "../../hooks/contract";
import useBalance from "../../hooks/useBalance";
import useI18n from "../../hooks/useI18n";
import { Docs } from "../../images";
import {
  Card,
  InfoGrid,
  InfoBox,
  InfoLabel,
  ContractAddress,
  InfoValueWrapper,
  InfoValue,
  Unit,
  BlockTip,
} from "./styled";

const Info: React.FC = () => {
  const contractAddress = getNodeAddress();
  const { $t } = useI18n();
  const { nodeCost } = useNodeCost();
  const { info } = useNodeInfo();
  const { balance } = useBalance(contractAddress);

  return (
    <Card>
      <InfoGrid>
        <InfoBox>
          <InfoLabel>{$t("contract_address")}</InfoLabel>
          <ContractAddress>{contractAddress}</ContractAddress>
        </InfoBox>
        <InfoBox flex>
          <Docs />
          <Unit>{$t("docs")}</Unit>
        </InfoBox>
      </InfoGrid>
      <InfoGrid>
        <InfoBox>
          <InfoLabel>{$t("contract_balance")}</InfoLabel>
          <InfoValueWrapper>
            <InfoValue>{balance || "--"}</InfoValue>
            <Unit>GAM</Unit>
          </InfoValueWrapper>
        </InfoBox>
        <InfoBox>
          <InfoLabel>{$t("nodecost")}</InfoLabel>
          <InfoValueWrapper>
            <InfoValue small>{nodeCost}</InfoValue>
            <Unit>GAM</Unit>
          </InfoValueWrapper>
        </InfoBox>
      </InfoGrid>
      <InfoGrid>
        <InfoGrid equal>
          <InfoBox>
            <InfoLabel>{$t("total_nodes")}</InfoLabel>
            <InfoValue>{info.totalNodes}</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>{$t("online")}</InfoLabel>
            <InfoValue>{info.onlineNodes}</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>{$t("released")}</InfoLabel>
            <InfoValue>{info.releaseNodes}</InfoValue>
          </InfoBox>
        </InfoGrid>
        <InfoBox>
          <InfoLabel>{$t("releaseblocks")}</InfoLabel>
          <InfoValueWrapper>
            <InfoValue small>{info.releaseNodes}</InfoValue>
            <Unit>Blocks</Unit>
          </InfoValueWrapper>
          <BlockTip>~180 days 12 h 50 min</BlockTip>
        </InfoBox>
      </InfoGrid>
    </Card>
  );
};

export default Info;
