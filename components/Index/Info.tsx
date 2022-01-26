import React from "react";
import Image from "next/image";
import { getNodeAddress } from "../../config/utils";
import {
  useNodeCost,
  useNodeInfo,
  useReleaseBlocks,
  useWeb3Contract,
} from "../../hooks/contract";
import useDevice from "../../hooks/useDevice";
import useI18n from "../../hooks/useI18n";
import * as Images from "../../images";
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
  H5Grid,
} from "./styled";

const Info: React.FC = () => {
  const contractAddress = getNodeAddress();
  const { isMobile } = useDevice();
  const { $t } = useI18n();
  const { nodeCost } = useNodeCost();
  const { releaseBlocks, releaseTimes } = useReleaseBlocks();
  const { info } = useNodeInfo();
  const { contractBalance } = useWeb3Contract();

  return (
    <Card>
      {isMobile ? (
        <H5Grid>
          <InfoBox>
            <InfoLabel>{$t("contract_address")}</InfoLabel>
            <ContractAddress>{contractAddress}</ContractAddress>
          </InfoBox>
          <InfoBox>
            <InfoLabel>{$t("contract_balance")}</InfoLabel>
            <InfoValueWrapper>
              <InfoValue>{contractBalance || "--"}</InfoValue>
              <Unit>GAM</Unit>
            </InfoValueWrapper>
          </InfoBox>
          <InfoGrid>
            <InfoBox>
              <InfoLabel>{$t("total_nodes")}</InfoLabel>
              <InfoValue>{info.totalNodes}</InfoValue>
            </InfoBox>
            <InfoBox row>
              <Image
                src={require("../../images/docs.svg")}
                alt="docs"
                width={20}
                height={22}
              />
              <Unit>{$t("docs")}</Unit>
            </InfoBox>
          </InfoGrid>
          <InfoGrid>
            <InfoBox>
              <InfoLabel>{$t("online")}</InfoLabel>
              <InfoValue>{info.onlineNodes}</InfoValue>
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
            <InfoBox>
              <InfoLabel>{$t("released")}</InfoLabel>
              <InfoValue>{info.releaseNodes}</InfoValue>
            </InfoBox>
            <InfoBox>
              <InfoLabel>{$t("releaseblocks")}</InfoLabel>
              <InfoValueWrapper>
                <InfoValue small>{releaseBlocks}</InfoValue>
                <Unit>Blocks</Unit>
              </InfoValueWrapper>
              <BlockTip>~180 days 12 h 50 min</BlockTip>
            </InfoBox>
          </InfoGrid>
        </H5Grid>
      ) : (
        <>
          <InfoGrid>
            <InfoBox>
              <InfoLabel>{$t("contract_address")}</InfoLabel>
              <ContractAddress>{contractAddress}</ContractAddress>
            </InfoBox>
            <InfoBox row>
              <Images.Docs />
              <Unit>{$t("docs")}</Unit>
            </InfoBox>
          </InfoGrid>
          <InfoGrid>
            <InfoBox>
              <InfoLabel>{$t("contract_balance")}</InfoLabel>
              <InfoValueWrapper>
                <InfoValue>{contractBalance || "--"}</InfoValue>
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
                <InfoValue small>{releaseBlocks}</InfoValue>
                <Unit>Blocks</Unit>
              </InfoValueWrapper>
              <BlockTip>{releaseTimes}</BlockTip>
            </InfoBox>
          </InfoGrid>
        </>
      )}
    </Card>
  );
};

export default Info;
