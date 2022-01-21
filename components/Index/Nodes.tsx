import React, { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isAddress } from "@ethersproject/address";
import { debounce } from "lodash";
import {
  useLogout,
  useNodeId,
  useNodeRelease,
  useNodes,
  useWithdrawMint,
  useWithdrawPledge,
} from "../../hooks/contract";
import useDevice from "../../hooks/useDevice";
import useI18n from "../../hooks/useI18n";
import { useAccount } from "../../sdk/web3React/hooks";
import { substring } from "../../sdk/utils";
import { Modal, ModalHandleProps } from "../Modal";
import * as Images from "../../images";
import {
  Address,
  AddressHeader,
  Card,
  Create,
  NodesBox,
  NodesContent,
  NodeSearch,
  NodesGrid,
  NodesHeader,
  NodesLabel,
  NodesTitle,
  NodesValue,
  Release,
  RepleaseContent,
  SearchInput,
  Status,
  Withdraw,
} from "./styled";
import CreateContent from "./CreateContent";
import NoData from "./NoData";

const Nodes: React.FC = () => {
  const { $t } = useI18n();
  const [search, setSearch] = useState("");
  const modalRef = useRef<ModalHandleProps>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { isMobile } = useDevice();
  const { account } = useAccount();
  const { nodeId, fetchNodeId, searchNodeId } = useNodeId();
  const {
    nodeId: curNodeId,
    nodes,
    status,
    fetchNodes,
    searchNodes,
  } = useNodes(nodeId);
  const { release, fetchRelease } = useNodeRelease(nodes.investor);

  const refresh = useCallback(() => {
    fetchNodes();
    curNodeId && curNodeId !== "--" && fetchRelease();
  }, [curNodeId, fetchNodes, fetchRelease]);

  const { loading: withdrawMintLoading, fetchWithdrawMint } =
    useWithdrawMint(refresh);
  const { loading: withdrawPledgeLoading, fetchWithdrawPledge } =
    useWithdrawPledge(refresh);
  const { fetchLogout } = useLogout(refresh);

  const handerCreateSuccess = useCallback(() => {
    modalRef.current?.toggle();
    fetchNodeId();
  }, [fetchNodeId]);

  const isSelf = useMemo(() => {
    if (!account) return false;
    if (nodeId === "--") return true;
    return nodes.investor === account;
  }, [account, nodeId, nodes.investor]);

  const renderButton = useCallback(() => {
    if (status === 0)
      return (
        <Create onClick={() => modalRef.current?.toggle()}>
          {$t("create")}
        </Create>
      );
    if (status === 1)
      return <Release onClick={fetchLogout}>{$t("release")}</Release>;
    return null;
  }, [$t, fetchLogout, status]);

  const handleSearch = debounce((val: string) => {
    setSearch(val);
    if (!val) {
      fetchNodeId();
      fetchNodes();
    } else {
      if (!isAddress(val)) {
        toast.warn($t("error_address"));
      } else {
        searchNodeId(val).then((searchNid) => {
          console.log("searchNid: ", searchNid);
          if (searchNid !== "--") {
            searchNodes(searchNid);
          } else {
            searchNodes(val);
          }
        });
      }
    }
  }, 200);

  return (
    <>
      <Card>
        <NodesHeader>
          <NodesTitle>{$t("node_info")}</NodesTitle>
          <NodeSearch>
            <Images.Search data-type="search" />
            <SearchInput
              ref={searchRef}
              placeholder={$t("search_placeholder")}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {search && (
              <Images.Close
                data-type="close"
                onClick={() => {
                  if (searchRef.current) searchRef.current.value = "";
                  setSearch("");
                  handleSearch("");
                }}
              />
            )}
          </NodeSearch>
        </NodesHeader>

        <NodesBox>
          <AddressHeader>
            <NodesGrid>
              <Address>{$t("address")}:</Address>
              <Address>
                {isMobile ? substring(nodes.investor) : nodes.investor}
                {isMobile && nodes.investor !== "--" && (
                  <CopyToClipboard
                    text={nodes.investor}
                    onCopy={() => toast.success($t("copy_succ"))}
                  >
                    <Images.Copy />
                  </CopyToClipboard>
                )}
              </Address>
            </NodesGrid>
            {isSelf && renderButton()}
          </AddressHeader>
          {search && status === 0 ? (
            <NoData />
          ) : (
            <NodesContent>
              <NodesGrid>
                <NodesLabel>{$t("node_id")}:</NodesLabel>
                <NodesValue>
                  {isMobile ? substring(curNodeId) : curNodeId}
                  {isMobile && curNodeId && curNodeId !== "--" && (
                    <CopyToClipboard
                      text={curNodeId}
                      onCopy={() => toast.success($t("copy_succ"))}
                    >
                      <Images.Copy />
                    </CopyToClipboard>
                  )}
                </NodesValue>
              </NodesGrid>
              <NodesGrid>
                <NodesLabel>{$t("node_status")}</NodesLabel>
                <NodesValue>
                  {status === 0 ? (
                    "--"
                  ) : (
                    <Status code={status}>
                      {$t(status === 1 ? "valid" : "release")}
                    </Status>
                  )}
                  <Images.Tip />
                </NodesValue>
              </NodesGrid>
              <NodesGrid>
                <NodesLabel>{$t("block_online")}:</NodesLabel>
                <NodesValue>
                  {Number(nodes.blockOnline) > 0 ? (
                    <Status code={1}>{$t("online")}</Status>
                  ) : (
                    <Status code={2}>{$t("offline")}</Status>
                  )}
                  <Images.Tip />
                </NodesValue>
              </NodesGrid>
              <NodesGrid>
                <NodesLabel>{$t("block_register")}:</NodesLabel>
                <NodesValue>{nodes.blockRegister}</NodesValue>
              </NodesGrid>
              <NodesGrid>
                <NodesLabel>{$t("balance_pledge")}:</NodesLabel>
                <NodesValue>{nodes.balancePledge} GAM</NodesValue>
              </NodesGrid>
              <NodesGrid>
                <NodesLabel>{$t("total_mint")}:</NodesLabel>
                <NodesValue>{nodes.totalMint} GAM</NodesValue>
              </NodesGrid>
              <NodesGrid>
                <NodesLabel>{$t("balance_mint")}:</NodesLabel>
                <NodesValue>
                  {nodes.balanceMint} GAM
                  {isSelf && parseInt(nodes.balanceMint) > 0 && (
                    <Withdraw
                      data-type="balance"
                      disabled={withdrawMintLoading}
                      onClick={fetchWithdrawMint}
                    >
                      {withdrawMintLoading ? (
                        <Images.RollingWhite width="20px" height="20px" />
                      ) : (
                        $t("withdraw")
                      )}
                    </Withdraw>
                  )}
                </NodesValue>
              </NodesGrid>
            </NodesContent>
          )}
        </NodesBox>

        {status === 2 && (
          <RepleaseContent>
            <NodesGrid>
              <NodesLabel>{$t("pending_asset")}:</NodesLabel>
              <NodesValue>
                {release.pendingAsset} GAM
                {isSelf && parseInt(release.pendingAsset) > 0 && (
                  <Withdraw
                    data-type="pending"
                    disabled={withdrawPledgeLoading}
                    onClick={fetchWithdrawPledge}
                  >
                    {withdrawPledgeLoading ? (
                      <Images.RollingWhite width="20px" height="20px" />
                    ) : (
                      $t("withdraw")
                    )}
                  </Withdraw>
                )}
              </NodesValue>
            </NodesGrid>
            <NodesGrid>
              <NodesLabel>{$t("locked_asset")}:</NodesLabel>
              <NodesValue>{release.lockedAsset} GAM</NodesValue>
            </NodesGrid>
            <NodesGrid>
              <NodesLabel>{$t("release_time")}:</NodesLabel>
              <NodesValue>{release.releaseTime}</NodesValue>
            </NodesGrid>
          </RepleaseContent>
        )}
      </Card>
      <Modal ref={modalRef} title={$t("create_node")}>
        <CreateContent onSuccess={handerCreateSuccess} />
      </Modal>
    </>
  );
};

export default Nodes;
