import React from "react";
import connectors from "../sdk/web3React/config/connectors";
import { useConnect } from "../sdk/web3React/hooks";

const Home: React.FC = () => {
  const { connect } = useConnect();

  return (
    <div>
      {connectors.map((connector, index) => (
        <button key={index} onClick={() => connect(connector)}>
          {connector.title}
        </button>
      ))}
    </div>
  );
};

export default Home;
