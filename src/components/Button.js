import React from "react";
import styled from "@emotion/styled";
import Color from "color";

const StyledButton = styled.button`
  display: ${({ block }) => (block ? "flex" : "inline-flex")};
  margin: 0;
  box-sizing: border-box;
  padding: ${({ block }) => (block ? "12px 14px" : "8px 12px")};
  width: ${({ block }) => (block ? "100%" : undefined)};
  justify-content: ${({ block }) => (block ? "center" : undefined)};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.m};
  background-color: ${({ theme }) => Color(theme.colors.complementary).toString()};
  border: 0;
  outline: 0;
  transition: background-color 150ms ease-in-out;
  font-size: ${({ block }) => (block ? "0.9rem" : "0.8rem")};
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-weight: 700;
  color: ${({ theme }) => theme.buttonText};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => Color(theme.colors.complementary).darken(0.2).toString()};
  }
`;

export const Button = ({ children, onClick, title, block }) => {
  return (
    <StyledButton title={title} onClick={onClick} block={block}>
      {children}
    </StyledButton>
  );
};
