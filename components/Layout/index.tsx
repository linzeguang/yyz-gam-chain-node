import React from "react";
import styled from "styled-components";
import { useEagerConnect } from "../../sdk/web3React/hooks";
import Footer from "./Footer";
import Header from "./Header";
import { Main } from "./styled";

const Layout: React.FC = (props) => {
  useEagerConnect();
  return (
    <React.Fragment>
      <Header />
      <Main {...props} />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
