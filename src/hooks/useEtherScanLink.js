import { CHAINS } from "../data/constants";
import { useWallet } from "./useWallet";

export const useEtherScanLink = (id, type) => {
  const { chainId } = useWallet();

  if (type === "address") {
    return `https://${CHAINS[chainId].etherScanPrefix}etherscan.io/address/${id}`;
  }
  return `https://${CHAINS[chainId].etherScanPrefix}etherscan.io/tx/${id}`;
};
