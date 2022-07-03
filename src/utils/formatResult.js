import { formatEther } from "@ethersproject/units";

export const formatResult = (result, type) => {
  switch (type) {
    case "eth":
      return formatEther(result);
    case "number":
      return result.toNumber();
    default:
      return result;
  }
};
