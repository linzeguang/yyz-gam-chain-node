import React from "react";
import styled from "styled-components";
import { useEagerConnect } from "../../sdk/web3React/hooks";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  useEagerConnect();
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default Layout;
