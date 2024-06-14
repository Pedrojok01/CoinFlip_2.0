import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@emotion/react";
import { Web3ReactProvider } from "@web3-react/core";

import { App } from "./App";
import { useAppContext, AppContextProvider } from "./AppContext";
import { metaMask, metaMaskHooks } from "./data/connectors";
import { darkTheme, lightTheme } from "./theme";

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
  <StrictMode>
    <Web3ReactProvider connectors={[[metaMask, metaMaskHooks]]}>
      <AppContextProvider>
        <RootApp />
      </AppContextProvider>
    </Web3ReactProvider>
  </StrictMode>
);
