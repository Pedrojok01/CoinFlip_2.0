import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Message } from "./Message";

const StyledButtonIcon = styled.button`
  border: 0;
  background: 0;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  outline: 0;
  &:focus,
  :hover,
  :visited {
    color: ${({ theme }) => theme.text};
  }
`;

export const Notification = ({ icon, title, isSuccess, isError, wrapText, hideIn }) => {
  const [isHiding, setIsHiding] = useState();
  const [isHidden, setIsHidden] = useState();

  const handleClose = useCallback(() => {
    setIsHiding(true);
    setTimeout(() => {
      setIsHidden(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (!hideIn) {
      return;
    }

    setTimeout(() => {
      handleClose();
    }, [hideIn]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideIn]);

  return (
    <Message error={isError} success={isSuccess} isHiding={isHiding} isHidden={isHidden} large>
      {icon ? (
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <FontAwesomeIcon fixedWidth icon={icon} size="3x" />
        </div>
      ) : null}

      <span
        style={{
          whiteSpace: wrapText ? undefined : "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginRight: 4,
          marginLeft: 4,
          width: "100%",
        }}
      >
        {title}
      </span>
      <StyledButtonIcon
        onClick={handleClose}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
        }}
      >
        <FontAwesomeIcon size="2x" icon={faTimes} />
      </StyledButtonIcon>
    </Message>
  );
};
