import React, { useCallback, useRef } from "react";
import useI18n from "../../hooks/useI18n";
import { useAccount, useConnect } from "../../sdk/web3React/hooks";
import * as Images from "../../images";
import {
  Balance,
  HeaderContainer,
  HeaderWrapper,
  HeaderBox,
  LogoImage,
  LogoText,
  Unit,
  WalletButton,
} from "./styled";
import { Modal, ModalHandleProps } from "../Modal";
import WalletContent from "../Wallet/WalletContent";
import { useUpdateEffect } from "ahooks";

const Header = () => {
  const { $t } = useI18n();
  const { active, balance } = useAccount();
  const { disconnect } = useConnect();
  const modalRef = useRef<ModalHandleProps>(null);

  const handler = useCallback(() => {
    if (active) {
      disconnect();
    } else {
      modalRef.current?.toggle();
    }
  }, [active, disconnect, modalRef]);

  useUpdateEffect(() => {
    active && modalRef.current?.toggle(false);
  }, [active, modalRef]);

  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <HeaderBox>
            <LogoImage src="/images/logo.png" />
            <LogoText>{$t("header_title")}</LogoText>
            <Balance>{balance}</Balance>
            <Unit>GAM</Unit>
          </HeaderBox>
          <HeaderBox>
            <WalletButton onClick={handler}>
              <span>
                <Images.Connect />
                {$t(active ? "disconnect" : "connect_wallet")}
              </span>
            </WalletButton>
          </HeaderBox>
        </HeaderContainer>
      </HeaderWrapper>
      <Modal ref={modalRef} title={$t("connect_wallet")}>
        <WalletContent />
      </Modal>
    </>
  );
};

export default Header;
