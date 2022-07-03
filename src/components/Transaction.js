import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCheck, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEtherScanLink } from "../hooks/useEtherScanLink";
import { WAITFOR_CONFIRMATIONS } from "../constants";
import { Message } from "./Message";
import { useAppContext } from "../AppContext";

const StyledLinkIcon = styled.a`
  color: ${({ theme }) => theme.text};
  &:focus,
  :hover,
  :visited {
    color: ${({ theme }) => theme.text};
  }
`;

export const Transaction = ({ hash, wait }) => {
  const { syncAll } = useAppContext();
  const [isConfirmed, setIsConfirmed] = useState();
  const [isHiding, setIsHiding] = useState();
  const [isHidden, setIsHidden] = useState();
  const [hasError, setHasError] = useState();
  const etherScanAddress = useEtherScanLink(hash, "tx");

  useEffect(() => {
    if (wait) {
      wait(WAITFOR_CONFIRMATIONS).then(({ status }) => {
        syncAll();
        if (status === 1) {
          setIsConfirmed(true);
          setTimeout(() => {
            setIsHiding(true);
          }, 2000);
          setTimeout(() => {
            setIsHidden(true);
          }, 2500);
        } else {
          setHasError(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wait]);

  return (
    <Message error={hasError} success={isConfirmed} isHiding={isHiding} isHidden={isHidden}>
      {isConfirmed && <FontAwesomeIcon fixedWidth icon={faCheck} />}
      {hasError && <FontAwesomeIcon fixedWidth icon={faTimes} />}
      {!isConfirmed && !hasError && <FontAwesomeIcon fixedWidth icon={faSpinner} spin />}

      <span
        style={{
          flexGrow: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginRight: 4,
          marginLeft: 4,
        }}
      >
        {hash}
      </span>
      <StyledLinkIcon href={etherScanAddress} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon fixedWidth icon={faExternalLinkAlt} />
      </StyledLinkIcon>
    </Message>
  );
};
