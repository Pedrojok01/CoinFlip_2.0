import { useEffect, useCallback } from "react";
import { useCoinFlipContract } from "./useContract";

export const useEventCallback = (name, callback, deps) => {
  const contract = useCoinFlipContract();
  // eslint-disable-next-line
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, contract, memoizedCallback]);
};
