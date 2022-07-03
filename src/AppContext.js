import React, { useContext, useState, useCallback, useEffect } from "react";
import { useReadFunction } from "./hooks/useReadFunction";
import { useWallet } from "./hooks/useWallet";
import { formatResult } from "./utils/formatResult";
import { v4 as uuidv4 } from "uuid";

const AppContext = React.createContext({});
const DEFAULT_THEME = "dark";

const useBalance = () => {
  const { library, account } = useWallet();
  const [balance, setBalance] = useState(library ? library.getBalance(account) : undefined);

  const getBalance = useCallback(async () => {
    if (!library || !account) {
      setBalance(undefined);
      return;
    }

    const result = await library.getBalance(account);
    setBalance(formatResult(result, "eth"));
  }, [library, account]);

  useEffect(() => {
    getBalance();
  }, [library, account, getBalance]);

  return {
    balance,
    getBalance,
  };
};

export const useAppContext = () => useContext(AppContext);
export const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotification] = useState([]);

  const { value: contractBalance, call: getContractBalance } = useReadFunction("getContractBalance", "eth");
  const { value: profit, call: getProfit } = useReadFunction("getPlayerBalance", "eth");
  const { balance, getBalance } = useBalance();

  const syncAll = useCallback(() => {
    getContractBalance();
    getProfit();
    getBalance();
  }, [getContractBalance, getProfit, getBalance]);

  const addTransaction = useCallback(
    (transaction) => {
      const onCreatedTimeStamp = new Date();
      setTransactions([
        ...transactions,
        {
          ...transaction,
          onCreatedTimeStamp,
          type: "transaction",
          id: transaction.hash,
        },
      ]);
    },
    [transactions]
  );

  const addNotification = useCallback(
    (notification) => {
      const onCreatedTimeStamp = new Date();

      setNotification([
        ...notifications,
        {
          ...notification,
          onCreatedTimeStamp,
          type: "notification",
          id: uuidv4(),
        },
      ]);
    },
    [notifications]
  );

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
