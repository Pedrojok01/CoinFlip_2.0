import React from "react";
import styled from "@emotion/styled";
import "sanitize.css";

import { Card } from "./components/Card";
import { Main } from "./components/Main";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Admin } from "./components/Admin";
import { Notifications } from "./components/Notifications";
import { Warning } from "./components/Warning";
import { Game } from "./components/Game";
import { useEagerConnect } from "./hooks/useWallet";

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
  useEagerConnect();

  return (
    <Wrapper>
      <Notifications />
      <Warning />
      <Header />
      <Main>
        <Card>
          <Game />
          <Admin />
        </Card>
      </Main>
      <Footer />
    </Wrapper>
  );
};
