import { useMemo } from "react";

import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";

import { COINFLIP } from "../data/constants";

export const useContract = (address, abi) => {
  const { provider, account } = useWeb3React();

  return useMemo(() => {
    if (!address || !abi || !provider) return null;
    try {
      const signer = provider.getSigner(account);

      return new Contract(address, abi, signer);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, abi, provider, account]);
};

export const useCoinFlipContract = () => useContract(COINFLIP.address, COINFLIP.abi);
