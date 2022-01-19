import styled from "styled-components";
import { Container } from "../common/Container";

export const HeaderWrapper = styled.header`
  height: 60px;
  background-color: #fff;
  box-shadow: 1.1px 3.8px 5px 0 rgba(0, 0, 0, 0.02);
`;

export const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const HeaderBox = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 58px;
  height: 30px;
`;

export const LogoText = styled.div`
  margin-left: 12px;
  margin-right: 30px;
  font-size: 28px;
  font-weight: bold;
  color: #1e1e1e;
`;

export const Balance = styled.div`
  padding: 0 12px;
  font-size: 18px;
  line-height: 28px;
  color: #f4b058;
  background-color: #fff5e8;
  border-radius: 5px;
`;

export const Unit = styled.span`
  margin-left: 8px;
  font-size: 20px;
  color: #1e1e1e;
`;

export const WalletButton = styled.button`
  position: relative;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 5px;
  background: linear-gradient(to top, #0166fd, #0a93e4);
  cursor: pointer;
  * {
    transition: all 300ms;
  }
  span {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    font-size: 16px;
    color: #036ff8;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid;

    svg {
      margin-right: 6px;
    }
  }
  :hover {
    span {
      color: #fff;
      background-color: transparent;
      border-color: transparent;
      svg {
        path {
          fill: #fff;
        }
      }
    }
  }
`;
