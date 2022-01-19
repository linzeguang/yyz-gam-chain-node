import styled from "styled-components";
import { Container } from "../common/Container";

export const Card = styled.div`
  margin-top: 30px;
  padding: 34px 34px 44px;
  background-color: #fff;
  border: solid 1px #f4f4f5;
  border-radius: 5px;
  box-shadow: 1.1px 3.8px 5px 0 rgba(0, 0, 0, 0.02);
`;

export const ContractAddress = styled.div`
  font-size: 24px;
`;

export const InfoBox = styled.div<{ flex?: boolean }>`
  display: ${({ flex }) => (flex ? "flex" : "block")};
  align-items: ${({ flex }) => (flex ? "center" : "flex-start")};
  padding: 20px 56px;
  border-radius: 5px;
  border: solid 1px #f4f4f5;
  background-color: #f7f8fa;
`;

export const InfoGrid = styled.div<{ equal?: boolean }>`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: ${({ equal }) =>
    equal ? "repeat(3, 1fr)" : "2fr 1fr"};
  & + div {
    margin-top: 20px;
  }
  & + ${InfoBox} {
    margin-top: 0;
  }
`;

export const InfoLabel = styled.div<{ docs?: boolean }>`
  font-size: ${({ docs }) => (docs ? "18px" : "16px")};
  font-weight: ${({ docs }) => (docs ? "bold" : "normal")};
  margin-bottom: ${({ docs }) => (docs ? "0" : "18px")};
  margin-left: ${({ docs }) => (docs ? "18px" : "0")};
`;

export const InfoValueWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const InfoValue = styled.div<{ small?: boolean }>`
  font-family: DINAlternate;
  font-size: ${({ small }) => (small ? "36px" : "48px")};
  line-height: 0.9;
  font-weight: bold;
  color: #0269fb;
`;

export const Unit = styled.div`
  margin-left: 12px;
  font-size: 30px;
  font-weight: bold;
`;

export const BlockTip = styled.div`
  margin-top: 16px;
  font-size: 16px;
  color: #bbb;
`;
