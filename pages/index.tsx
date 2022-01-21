import React from "react";
import Info from "../components/Index/Info";
import Nodes from "../components/Index/Nodes";
import { IndexWrapper } from "../components/Index/styled";

const Home: React.FC = () => {
  return (
    <IndexWrapper>
      <Info />
      <Nodes />
    </IndexWrapper>
  );
};

export default Home;
