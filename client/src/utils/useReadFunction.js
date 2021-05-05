import { useCallback, useState, useEffect } from "react";
import { useCoinFlipContract } from "../useContract";
import { calculateGasMargin } from "./calculateGasMargin";
import { formatResult } from "./formatResult";

export const useReadFunction = (player, type) => {
  const contract = useCoinFlipContract();
  const [value, setValue] = useState();

  const doCall = useCallback(async () => {
    if (!contract) {
      return;
    }

    const estimatedGas = await contract.estimateGas[player]();

    const result = await contract[player]({gasLimit: calculateGasMargin(estimatedGas),});

    setValue(formatResult(result, type));
  }, [contract, player]);

  useEffect(() => {
    if (contract) {
      doCall();
    }
  }, [contract]);

  return { call: doCall, value };
};