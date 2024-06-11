export const calculateGasMargin = (value) => {
  const bigIntValue = BigInt(value);
  const margin = 1000n;
  const base = 10000n;
  return (bigIntValue * (base + margin)) / base;
};
