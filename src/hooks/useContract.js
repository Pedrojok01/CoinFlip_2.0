import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import { abi } from "../abis/coinFlip";
import { useWallet } from "./useWallet";
import { COINFLIP_ADDRESS } from "../constants";

export const useContract = (address, abi) => {
  const { library, account } = useWallet();

  return useMemo(() => {
    if (!address || !abi || !library) return null;
    try {
      const signer = library.getSigner(account);

      return new Contract(address, abi, signer);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, abi, library, account]);
};

export const useCoinFlipContract = () => useContract(COINFLIP_ADDRESS, abi);
