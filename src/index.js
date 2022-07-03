import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { useAppContext, AppContextProvider } from "./AppContext";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

const POLLIN_INTERVAL = 4000;
const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLIN_INTERVAL;
  return library;
};

const InnerApp = () => {
  const { theme } = useAppContext();
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <App />
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppContextProvider>
        <InnerApp />
      </AppContextProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
