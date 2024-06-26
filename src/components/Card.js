import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledCard = styled.div`
  width: 90%;
  max-width: 550px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.l};
  background-color: ${({ theme }) => theme.cardBackground};
  box-shadow:
    0 24px 51px rgba(0, 0, 0, 0.1),
    0 3px 4px -2px rgba(0, 0, 0, 0.12);
  padding: ${({ theme }) => theme.space.xl}px;
  padding-block: 20px;
  margin-bottom: 20px;
`;

export const Card = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};
