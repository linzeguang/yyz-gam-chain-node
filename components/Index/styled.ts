import styled from "styled-components";
import { Container } from "../common/Container";

export const IndexWrapper = styled(Container)`
  padding: 30px 40px;
  @media screen and (max-width: 768px) {
    padding: 15px 15px;
  }
`;

export const Card = styled.div`
  padding: 34px 34px 44px;
  background-color: #fff;
  border: solid 1px #f4f4f5;
  border-radius: 5px;
  box-shadow: 1.1px 3.8px 5px 0 rgba(0, 0, 0, 0.02);
  & + div {
    margin-top: 30px;
  }
  @media screen and (max-width: 768px) {
    padding: 15px;
    & + div {
      margin-top: 15px;
    }
  }
`;

export const H5Grid = styled.div`
  display: grid;
  grid-gap: 10px;
`;

// info
export const ContractAddress = styled.div`
  font-size: 24px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const InfoBox = styled.div<{ row?: boolean }>`
  display: flex;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
  align-items: ${({ row }) => (row ? "center" : "flex-start")};
  justify-content: ${({ row }) => (row ? "flex-start" : "center")};
  padding: 20px 56px;
  border-radius: 5px;
  border: solid 1px #f4f4f5;
  background-color: #f7f8fa;

  @media screen and (max-width: 1180px) {
    padding: 12px 36px;
  }

  @media screen and (max-width: 768px) {
    padding: 12px 15px;
  }
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

  @media screen and (max-width: 768px) {
    grid-gap: 10px;
    grid-template-columns: ${({ equal }) =>
      equal ? "repeat(3, 1fr)" : "repeat(2, 1fr)"};

    & + div {
      margin-top: 0px;
    }
  }
`;

export const InfoLabel = styled.div<{ docs?: boolean }>`
  font-size: ${({ docs }) => (docs ? "18px" : "16px")};
  font-weight: ${({ docs }) => (docs ? "bold" : "normal")};
  margin-bottom: ${({ docs }) => (docs ? "0" : "18px")};
  margin-left: ${({ docs }) => (docs ? "18px" : "0")};
  @media screen and (max-width: 768px) {
    margin-bottom: ${({ docs }) => (docs ? "0" : "10px")};
  }
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

  @media screen and (max-width: 1180px) {
    font-size: ${({ small }) => (small ? "24px" : "36px")};
  }

  @media screen and (max-width: 768px) {
    font-size: ${({ small }) => (small ? "20px" : "24px")};
  }
`;

export const Unit = styled.div`
  margin-left: 12px;
  font-size: 30px;
  font-weight: bold;

  @media screen and (max-width: 1180px) {
    font-size: 16px;
  }
`;

export const BlockTip = styled.div`
  margin-top: 16px;
  font-size: 16px;
  color: #bbb;
  @media screen and (max-width: 768px) {
    margin-top: 12px;
    font-size: 12px;
    /* white-space: nowrap; */
  }
`;

// nodes

export const NodesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
  }
`;

export const NodesTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 36px;
  &::before {
    content: "";
    display: block;
    width: 8px;
    height: 28px;
    margin-right: 18px;
    border-radius: 2px;
    background-color: #0269fb;
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
    &::before {
      height: 16px;
      width: 4px;
      margin-right: 10px;
    }
  }
`;

export const NodeSearch = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 42px;
  width: 30%;
  max-width: 360px;
  border-radius: 21px;
  border: solid 1px #f4f4f5;
  background-color: #f7f8fa;
  svg[data-type="search"] {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  }
  svg[data-type="close"] {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: 38px;
    margin-top: 10px;
    border-radius: 5px;
  }
`;

export const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  padding-left: 50px;
  padding-right: 40px;
  font-size: 16px;
  background-color: transparent;
  border: none;
  outline: none;
  ::placeholder {
    color: #bbb;
  }
`;

export const NodesBox = styled.div`
  padding: 26px;
  border-radius: 5px;
  border: solid 1px #f4f4f5;
  background-color: #f7f8fa;
  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

export const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding-right: 30px;
  border-radius: 5px;
  border: solid 1px #f4f4f5;
  background-color: #fff;
  @media screen and (max-width: 768px) {
    height: 40px;
    padding-right: 10px;
  }
`;

export const NodesGrid = styled.div`
  display: grid;
  grid-gap: 42px;
  grid-template-columns: 160px 1fr;
  > div:first-child {
    text-align: right;
    justify-content: flex-end;
  }
  @media screen and (max-width: 1180px) {
    grid-gap: 24px;
    grid-template-columns: 120px 1fr;
  }
  @media screen and (max-width: 768px) {
    grid-gap: 10px;
    grid-template-columns: 90px 1fr;
  }
`;

export const Address = styled.div`
  font-size: 24px;

  @media screen and (max-width: 1180px) {
    font-size: 20px;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    font-size: 14px;
    svg {
      margin: 0 4px;
    }
  }
`;

export const Create = styled.button`
  height: 30px;
  padding: 0 16px;
  border-radius: 5px;
  border: solid 1px #61a966;
  background-color: transparent;
  color: #61a966;
  transition: all 300ms;
  cursor: pointer;
  :hover,
  :active {
    color: #fff;
    background-color: #61a966;
  }

  @media screen and (max-width: 768px) {
    height: 24px;
    padding: 0 10px;
    font-size: 12px;
  }
`;

export const Release = styled.button`
  height: 30px;
  padding: 0 16px;
  border-radius: 5px;
  border: solid 1px #db5656;
  background-color: transparent;
  color: #db5656;
  transition: all 300ms;
  cursor: pointer;
  :hover,
  :active {
    color: #fff;
    background-color: #db5656;
  }

  @media screen and (max-width: 768px) {
    height: 24px;
    padding: 0 10px;
    font-size: 12px;
  }
`;

export const NodesContent = styled.div`
  margin-top: 20px;
  ${NodesGrid} {
    padding: 10px 0;
  }
  @media screen and (max-width: 768px) {
    margin-top: 10px;

    ${NodesGrid} {
      padding: 6px 0;
    }
  }
`;

export const NodesLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const NodesValue = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  svg {
    margin-left: 10px;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
    svg {
      width: 16px;
      height: 16px;
      margin-left: 4px;
    }
  }
`;

export const Status = styled.button<{ code: number }>`
  height: 22px;
  padding: 0 20px;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  background-color: ${({ code }) => (code === 1 ? "#defbe0" : "#fde4e4")};
  color: ${({ code }) => (code === 1 ? " #61a966" : "#db5656")};

  @media screen and (max-width: 768px) {
    padding: 0 12px;
  }
`;

export const RepleaseContent = styled.div`
  padding: 26px;

  ${NodesGrid} {
    padding: 10px 0;
  }

  @media screen and (max-width: 768px) {
    padding: 10px 15px;
    ${NodesGrid} {
      padding: 6px 0;
    }
  }
`;

export const Withdraw = styled.button`
  height: 22px;
  padding: 0 20px;
  margin-left: 20px;
  font-size: 14px;
  border-radius: 5px;
  background-color: transparent;
  transition: all 300ms;
  cursor: pointer;
  &[data-type="pending"] {
    color: #fb9e26;
    border: 1px solid #fb9e26;
    :hover,
    :disabled {
      color: #fff;
      background-color: #fb9e26;
    }
  }
  &[data-type="balance"] {
    color: #0fa7ff;
    border: 1px solid #0fa7ff;
    :hover,
    :disabled {
      color: #fff;
      background-color: #0fa7ff;
    }
  }

  @media screen and (max-width: 768px) {
    margin-left: 4px;
    padding: 0 12px;
  }
`;

export const CreateWrapper = styled.div``;

export const NodeIdWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 45px;
  width: 100%;
  border-radius: 5px;
  border: solid 1px #f4f4f5;
  background-color: #f7f8fa;
  svg {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
`;
export const NodeIdInput = styled.input`
  height: 100%;
  width: 100%;
  padding-left: 20px;
  padding-right: 50px;
  font-size: 16px;
  background-color: transparent;
  border: none;
  outline: none;
  ::placeholder {
    color: #bbb;
  }
`;

export const CreateTip = styled.div`
  margin-top: 14px;
  margin-bottom: 30px;
  font-size: 14px;
`;

export const CreateSubmit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  font-size: 16px;
  color: #fff;
  border-radius: 5px;
  background: linear-gradient(to right, #0166fd, #0a93e4);
  border: none;
  cursor: pointer;
  transition: all 300ms;
  :hover,
  :disabled {
    opacity: 0.6;
  }
`;

// NoData
export const NoDataWrapper = styled.div`
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NoDataText = styled.div`
  margin-top: 28px;
  font-size: 16px;
  color: #bbb;
`;
