import { useEffect, useCallback } from "react";
import { useCoinFlipContract } from "../useContract";

export const useEventCallback = (name, callback, deps) => {
  const contract = useCoinFlipContract();

  const memoizedCallback = useCallback(callback, deps);

  useEffect(() => {
    if (contract) {
      contract.on(name, memoizedCallback);
    }

    return () => {
      if (contract) {
        contract.off(name, memoizedCallback);
      }
    };
  }, [name, contract, memoizedCallback]);
};