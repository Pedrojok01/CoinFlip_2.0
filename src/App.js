import React, { useMemo } from "react";

import { useWeb3React } from "@web3-react/core";
import styled from "@emotion/styled";
import "sanitize.css";

import { Admin, Card, ConnectButton, Footer, Game, Header, Main, Notifications, Warning } from "./components";
import { useCoinFlipContract } from "./hooks";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: ${({ theme }) => theme.fonts.body};
  h1,
  h2,
  h3 {
    margin: 0;
    line-height: 1;
  }
`;

export const App = () => {
  const { isActive, account } = useWeb3React();
  const contract = useCoinFlipContract();

  const content = useMemo(() => {
    if (!isActive || !account) {
      return <ConnectButton block>Connect your wallet to start</ConnectButton>;
    }
    if (!contract) {
      return <NoContract />;
    }
    return <Game />;
  }, [isActive, account, contract]);

  return (
    <Wrapper>
      <Notifications />
      <Warning />
      <Header />
      <Main>
        <Card>{content}</Card>
        <Admin />
      </Main>
      <Footer />
    </Wrapper>
  );
};

const NoContract = () => {
  return <p>Could not connect to the contract</p>;
};
