import React, { useContext, useState, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useReadFunction } from "./hooks/useReadFunction";
import { useWallet } from "./hooks/useWallet";
import { formatResult } from "./utils/formatResult";
import { v4 as uuidv4 } from "uuid";

const AppContext = React.createContext({});
const DEFAULT_THEME = "dark";

const useBalance = () => {
  const { provider, account } = useWallet();
  const [balance, setBalance] = useState();

  const getBalance = useCallback(async () => {
    if (!provider || !account) {
      setBalance(undefined);
      return;
    }

    const result = await provider.getBalance(account);
    setBalance(formatResult(result, "eth"));
  }, [provider, account]);

  useEffect(() => {
    getBalance();
  }, [provider, account, getBalance]);

  return useMemo(
    () => ({
      balance,
      getBalance,
    }),
    [balance, getBalance]
  );
};

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const toggleTheme = useCallback(() => setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")), []);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const { value: contractBalance, call: getContractBalance } = useReadFunction("getContractBalance", "eth");
  const { value: profit, call: getProfit } = useReadFunction("getPlayerBalance", "eth");
  const { balance, getBalance } = useBalance();

  const syncAll = useCallback(() => {
    getContractBalance();
    getProfit();
    getBalance();
  }, [getContractBalance, getProfit, getBalance]);

  const addTransaction = useCallback((transaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        ...transaction,
        onCreatedTimeStamp: new Date(),
        type: "transaction",
        id: transaction.hash,
      },
    ]);
  }, []);

  const addNotification = useCallback((notification) => {
    const onCreatedTimeStamp = new Date();

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      {
        ...notification,
        onCreatedTimeStamp,
        type: "notification",
        id: uuidv4(),
      },
    ]);
  }, []);

  const providerValue = useMemo(
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
      transactions,
      notifications,
      balance,
      profit,
      contractBalance,
      toggleTheme,
      addTransaction,
      addNotification,
      getBalance,
      getProfit,
      getContractBalance,
      syncAll,
    ]
  );

  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
