import { useState, useEffect, useCallback } from "react";

import { useFunction } from ".";

export const useGame = () => {
  const [betAmount, setBetAmount] = useState(0.01);
  const [betChoice, setBetChoice] = useState(null);
  const [shouldFlip, setShouldFlip] = useState(false);

  const doFlip = useFunction("bet", betAmount, [betChoice]);
  const collectFunds = useFunction("withdrawPlayerBalance");

  const handleBet = useCallback((choice) => {
    setBetChoice(choice);
    setShouldFlip(true);
  }, []);

  useEffect(() => {
    if (shouldFlip) {
      doFlip();
      setShouldFlip(false);
    }
  }, [shouldFlip, doFlip]);

  return {
    betAmount,
    setBetAmount,
    handleBet,
    collectFunds,
  };
};
