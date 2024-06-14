import { createContext, useCallback, useContext, useEffect, useMemo } from "react";

import PropTypes from "prop-types";

import { useReadFunction, useBalance } from "./hooks";
import { usePersistStore, useStore } from "./stores";

const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const { value: contractBalance, call: getContractBalance } = useReadFunction("getContractBalance", "eth");
  const { value: profit, call: getProfit } = useReadFunction("getPlayerBalance", "eth");
  const { balance, getBalance } = useBalance();

  const { theme, toggleTheme, setContractBalance, setProfit } = usePersistStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
    setContractBalance: state.setContractBalance,
    setProfit: state.setProfit,
  }));

  const { transactions, addTransaction, notifications, addNotification } = useStore((state) => ({
    transactions: state.transactions,
    addTransaction: state.addTransaction,
    notifications: state.notifications,
    addNotification: state.addNotification,
  }));

  const syncAll = useCallback(async () => {
    try {
      const contractBalance = await getContractBalance();
      setContractBalance(contractBalance);
      const profit = await getProfit();
      setProfit(profit);
      getBalance();
    } catch (error) {
      console.error("Failed to sync data:", error);
    }
  }, [getContractBalance, getProfit, getBalance, setContractBalance, setProfit]);

  useEffect(() => {
    syncAll();
  }, [syncAll]);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      transactions,
      addTransaction,
      notifications,
      addNotification,
      balance,
      getBalance,
      profit,
      getProfit,
      contractBalance,
      getContractBalance,
      syncAll,
    }),
    [
      theme,
      toggleTheme,
      transactions,
      addTransaction,
      notifications,
      addNotification,
      balance,
      getBalance,
      profit,
      getProfit,
      contractBalance,
      getContractBalance,
      syncAll,
    ]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
