import PropTypes from "prop-types";

const toSignificant = (value, signif) => {
  const [base, decimals = ""] = value.split(".");
  const significantDecimals = decimals.substring(0, signif - base.length);
  return `${base}.${significantDecimals}`;
};

export const Eth = ({ children = "0", signif = 6 }) => {
  const converted = toSignificant(String(children), signif);

  return <span>Ξ {converted}</span>;
};

Eth.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  signif: PropTypes.number,
};
