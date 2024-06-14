import { useWeb3React } from "@web3-react/core";

import { CHAINS } from "../data/constants";

export const useEtherScanLink = (id, type) => {
  const { chainId } = useWeb3React();

  if (type === "address") {
    return `https://${CHAINS[chainId]?.etherScanPrefix}etherscan.io/address/${id}`;
  }
  return `https://${CHAINS[chainId]?.etherScanPrefix}etherscan.io/tx/${id}`;
};
