import React from "react";
import { useEagerConnect } from "../../sdk/web3React/hooks";

const Layout: React.FC = ({ children }) => {
  useEagerConnect();
  return <div>{children}</div>;
};

export default Layout;
