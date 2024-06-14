import { useCallback } from "react";

import { parseEther } from "@ethersproject/units";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { useCoinFlipContract } from "./useContract";
import { useAppContext } from "../AppContext";
import { calculateGasMargin } from "../utils/calculateGasMargin";

export const useFunction = (functionName, rawValue, args = []) => {
  const contract = useCoinFlipContract();
  const { addTransaction, addNotification } = useAppContext();

  const doCall = useCallback(async () => {
    if (!contract) return;

    const parsedValue = rawValue ? parseEther(`${rawValue}`).toString() : undefined;

    try {
      const estimatedGas = await contract.estimateGas[functionName](...args, {
        value: parsedValue,
      });

      const { hash, from, value, wait } = await contract[functionName](...args, {
        value: parsedValue,
        gasLimit: calculateGasMargin(estimatedGas),
      });

      addTransaction({ hash, from, value, wait });
    } catch (error) {
      addNotification({
        title: error.reason ?? error.message ?? "Oops something went wrong",
        isError: true,
        wrapText: true,
        icon: faExclamationTriangle,
        hideIn: 2500,
      });
    }
  }, [functionName, rawValue, args, contract, addTransaction, addNotification]);

  return doCall;
};
