import { useCallback, useState, useEffect, useMemo } from "react";
import { useCoinFlipContract } from "./useContract";
import { calculateGasMargin } from "../utils/calculateGasMargin";
import { formatResult } from "../utils/formatResult";

export const useReadFunction = (player, type) => {
  const contract = useCoinFlipContract();
  const [value, setValue] = useState();

  const doCall = useCallback(async () => {
    if (!contract) return;

    try {
      const estimatedGas = await contract.estimateGas[player]();
      const result = await contract[player]({ gasLimit: calculateGasMargin(estimatedGas) });
      setValue(formatResult(result, type));
    } catch (error) {
      console.error("Error calling contract function:", error);
    }
  }, [contract, player, type]);

  useEffect(() => {
    if (contract) doCall();
  }, [contract, doCall]);

  return useMemo(() => ({ call: doCall, value }), [doCall, value]);
};
