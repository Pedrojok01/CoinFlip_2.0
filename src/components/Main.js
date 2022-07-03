import React from "react";
import styled from "@emotion/styled";

const StyledMain = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${({ theme }) => theme.space.m}px;
  padding-top: 65px;
  padding-bottom: 35px;
`;

export const Main = ({ children }) => <StyledMain>{children}</StyledMain>;
