import { useCallback, useState, useEffect } from "react";
import { useCoinFlipContract } from "./useContract";
import { calculateGasMargin } from "../utils/calculateGasMargin";
import { formatResult } from "../utils/formatResult";

export const useReadFunction = (player, type) => {
  const contract = useCoinFlipContract();
  const [value, setValue] = useState();

  const doCall = useCallback(async () => {
    if (!contract) {
      return;
    }
    const estimatedGas = await contract.estimateGas[player]();
    const result = await contract[player]({ gasLimit: calculateGasMargin(estimatedGas) });
    setValue(formatResult(result, type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, player]);

  useEffect(() => {
    if (contract) doCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  return { call: doCall, value };
};
