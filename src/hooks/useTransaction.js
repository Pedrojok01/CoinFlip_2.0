import { useState, useEffect, useCallback } from "react";

import { useEtherScanLink } from "../hooks";
import { WAITFOR_CONFIRMATIONS } from "../data/constants";
import { useAppContext } from "../AppContext";

export const useTransaction = (hash, wait) => {
  const { syncAll } = useAppContext();
  const [state, setState] = useState({
    isConfirmed: false,
    isHiding: false,
    isHidden: false,
    hasError: false,
  });
  const etherScanAddress = useEtherScanLink(hash, "tx");

  const confirmTransaction = useCallback(async () => {
    if (wait) {
      try {
        const { status } = await wait(WAITFOR_CONFIRMATIONS);
        syncAll();

        if (status === 1) {
          setState({ isConfirmed: true, isHiding: false, isHidden: false, hasError: false });
          setTimeout(() => {
            setState((prevState) => ({ ...prevState, isHiding: true }));
          }, 2000);
          setTimeout(() => {
            setState((prevState) => ({ ...prevState, isHidden: true }));
          }, 2500);
        } else {
          setState({ isConfirmed: false, isHiding: false, isHidden: false, hasError: true });
        }
      } catch {
        setState({ isConfirmed: false, isHiding: false, isHidden: false, hasError: true });
      }
    }
  }, [wait, syncAll]);

  useEffect(() => {
    confirmTransaction();
  }, [confirmTransaction]);

  return { ...state, etherScanAddress };
};
