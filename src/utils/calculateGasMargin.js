import { BigNumber } from "@ethersproject/bignumber";

export const calculateGasMargin = (value) =>
  value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));
