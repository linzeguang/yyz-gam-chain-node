import React from "react";
import { Container } from "../common/Container";
import { FooterText, FooterWrapper } from "./styled";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Container>
        <FooterText>
          ©2022 GAM Chain Association, all rights reserved.
        </FooterText>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
