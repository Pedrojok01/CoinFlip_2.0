import React from "react";

const toSignificant = (value, signif) => {
  const [base, decimals] = value.split(".");
  return [base, (decimals && decimals.substring(0, signif - base.length)) || "0"].join(".");
};

export const Eth = ({ children, signif = 6 }) => {
  const converted = toSignificant(children || "0", signif);

  return <span>Ξ {converted}</span>;
};
