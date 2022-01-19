import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .rc-dialog {
    margin: 10vh auto;
    box-shadow: 1.1px 3.8px 5px 0 rgba(0, 0, 0, 0.02);
  }
  .rc-dialog-close {
    font-size: 28px;
    transition: 300ms;
  }
`;

export default GlobalStyle;
