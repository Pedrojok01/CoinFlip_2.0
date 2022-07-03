import React from "react";
import styled from "@emotion/styled";
import { Button } from "./Button";
import { useAppContext } from "../AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space.m}px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
`;

export const Footer = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <StyledFooter>
      <div></div>
      <div style={{ pointerEvents: "auto" }}>
        <Button onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
        </Button>{" "}
      </div>
    </StyledFooter>
  );
};
