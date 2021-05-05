import { useWallet, chains } from "../useWallet";

export const useEtherScanLink = (id, type) => {
  const { chainId } = useWallet();

  if (type === "address") {
    return `https://${chains[chainId].etherScanPrefix}etherscan.io/address/${id}`;
  }
  return `https://${chains[chainId].etherScanPrefix}etherscan.io/tx/${id}`;
};