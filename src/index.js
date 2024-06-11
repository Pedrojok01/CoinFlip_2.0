// index.js
import React, { useMemo } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { useAppContext, AppContextProvider } from "./AppContext";
import { Web3ReactProvider } from "@web3-react/core";
import { metaMask, metaMaskHooks } from "./data/connectors";

const root = createRoot(document.getElementById("root"));

const RootApp = () => {
  const { theme } = useAppContext();
  const themeMemo = useMemo(() => (theme === "light" ? lightTheme : darkTheme), [theme]);

  return (
    <ThemeProvider theme={themeMemo}>
      <App />
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <Web3ReactProvider connectors={[[metaMask, metaMaskHooks]]}>
      <AppContextProvider>
        <RootApp />
      </AppContextProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);
