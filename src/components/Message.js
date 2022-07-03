import React from "react";
import styled from "@emotion/styled";

const StyledMessage = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ large }) => (large ? "column" : "row")};
  overflow: hidden;
  width: 300px;
  pointer-events: auto;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.m};
  background-color: ${({ theme, error, success }) =>
    error ? theme.colors.error : success ? theme.colors.success : theme.cardBackground};
  padding: ${({ theme, large }) => (large ? `${theme.space.m}px` : `${theme.space.s}px ${theme.space.m}px`)};
  margin-top: ${({ theme }) => `${theme.space.m}px`};
  transition: opacity 500ms ease-in-out, background-color 200ms ease-in-out;
  opacity: ${({ isHiding }) => (isHiding ? 0 : 1)};
  display: ${({ isHidden }) => (isHidden ? "none" : undefined)};
`;

export const Message = ({ children, ...rest }) => <StyledMessage {...rest}>{children}</StyledMessage>;
