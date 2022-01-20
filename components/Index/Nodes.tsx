import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { isAddress } from "@ethersproject/address";
import {
  useLogout,
  useNodeId,
  useNodeRelease,
  useNodes,
  useWithdrawMint,
  useWithdrawPledge,
} from "../../hooks/contract";
import useI18n from "../../hooks/useI18n";
import * as Images from "../../images";
import { useAccount } from "../../sdk/web3React/hooks";
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
import { Modal, ModalHandleProps } from "../Modal";
import CreateContent from "./CreateContent";
import NoData from "./NoData";
import { useDebounce } from "ahooks";

const Nodes: React.FC = () => {
  const { $t } = useI18n();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, { wait: 400 });
  const modalRef = useRef<ModalHandleProps>(null);

  const { account } = useAccount();
  const { nodeId, fetchNodeId } = useNodeId();
  const { nodeId: curNodeId, nodes, status, fetchNodes } = useNodes(nodeId);
  const { release, fetchRelease } = useNodeRelease(account?.toString() || "");

  const refresh = useCallback(() => {
    fetchNodes(curNodeId, true);
    curNodeId && curNodeId !== "--" && fetchRelease(curNodeId);
  }, [curNodeId, fetchNodes, fetchRelease]);

  const { loading: withdrawMintLoading, fetchWithdrawMint } =
    useWithdrawMint(refresh);
  const { loading: withdrawPledgeLoading, fetchWithdrawPledge } =
    useWithdrawPledge(refresh);
  const { fetchLogout } = useLogout(refresh);

  const isSelf = useMemo(() => {
    if (nodes.investor === "--") return true;
    return nodes.investor === account;
  }, [account, nodes]);

  // const handleSearch = useCallback(
  //   async (even: React.KeyboardEvent<HTMLInputElement>) => {
  //     const { keyCode } = even;
  //     if (keyCode !== 13) return;
  //     if (!search) {
  //       fetchNodes(nodeId);
  //       fetchRelease(nodeId);
  //     } else {
  //       if (!isAddress(search)) return toast.warn($t("error_address"));
  //       const searchNid = await fetchNodeId(search);
  //       console.log("searchNid: ", searchNid);
  //       await fetchNodes(searchNid !== "--" ? searchNid : search);
  //     }
  //   },
  //   [$t, fetchNodeId, fetchNodes, fetchRelease, nodeId, search]
  // );

  const handerCreateSuccess = useCallback(() => {
    modalRef.current?.toggle();
    account && fetchNodeId();
  }, [account, fetchNodeId]);

  return (
    <>
      <Card>
        <NodesHeader>
          <NodesTitle>{$t("node_info")}</NodesTitle>
          <NodeSearch>
            <Images.Search />
            <SearchInput
              placeholder={$t("search_placeholder")}
              onChange={(e) => setSearch(e.target.value)}
            />
          </NodeSearch>
        </NodesHeader>

        <NodesBox>
          <AddressHeader>
            <NodesGrid>
              <Address>{$t("address")}:</Address>
              <Address>
                {nodes.investor !== "--" ? nodes.investor : account || "--"}
              </Address>
            </NodesGrid>
            {account && isSelf ? (
              status === 0 ? (
                <Create onClick={() => modalRef.current?.toggle()}>
                  {$t("create")}
                </Create>
              ) : status === 1 ? (
                <Release onClick={fetchLogout}>{$t("release")}</Release>
              ) : null
            ) : null}
          </AddressHeader>
          {search && status === 0 ? (
            <NoData />
          ) : (
            <NodesContent>
              <NodesGrid>
                <NodesLabel>{$t("node_id")}:</NodesLabel>
                <NodesValue>{curNodeId || nodeId}</NodesValue>
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
                  <Images.Tip style={{ marginLeft: 10 }} />
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
                  <Images.Tip style={{ marginLeft: 10 }} />
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
