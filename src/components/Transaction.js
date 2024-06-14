import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCheck, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import { useTransaction } from "../hooks";
import { Message } from "./Message";

const StyledLinkIcon = styled.a`
  color: ${({ theme }) => theme.text};
  &:focus,
  :hover,
  :visited {
    color: ${({ theme }) => theme.text};
  }
`;

const HashSpan = styled.span`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 4px;
  margin-left: 4px;
`;

export const Transaction = ({ hash, wait }) => {
  const { isConfirmed, isHiding, isHidden, hasError, etherScanAddress } = useTransaction(hash, wait);

  return (
    <Message error={hasError} success={isConfirmed} isHiding={isHiding} isHidden={isHidden}>
      {isConfirmed && <FontAwesomeIcon fixedWidth icon={faCheck} />}
      {hasError && <FontAwesomeIcon fixedWidth icon={faTimes} />}
      {!isConfirmed && !hasError && <FontAwesomeIcon fixedWidth icon={faSpinner} spin />}

      <HashSpan>{hash}</HashSpan>
      <StyledLinkIcon href={etherScanAddress} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon fixedWidth icon={faExternalLinkAlt} />
      </StyledLinkIcon>
    </Message>
  );
};

Transaction.propTypes = {
  hash: PropTypes.string.isRequired,
  wait: PropTypes.func.isRequired,
};
