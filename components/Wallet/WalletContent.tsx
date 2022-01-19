import React, { useCallback } from "react";
import styled from "styled-components";
import connectors from "../../sdk/web3React/config/connectors";
import { useConnect } from "../../sdk/web3React/hooks";
import { Connector } from "../../sdk/web3React/types";

const Button = styled.button`
  border: none;
  background-color: transparent;
`;

const Text = styled.div`
  margin-top: 20px;
  font-size: 18px;
`;

const Grid = styled.div`
  margin: 40px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`;

export const ConnectorButton: React.FC<{ connector: Connector }> = ({
  connector,
}) => {
  const { connect } = useConnect();
  const { icon: Icon } = connector;

  return (
    <Button onClick={() => connect(connector)}>
      <Icon width="32%" />
      <Text>{connector.title}</Text>
    </Button>
  );
};

const WalletContent: React.FC = () => {
  return (
    <Grid>
      {connectors.map((connector) => (
        <ConnectorButton key={connector.priority} connector={connector} />
      ))}
    </Grid>
  );
};

export default WalletContent;
