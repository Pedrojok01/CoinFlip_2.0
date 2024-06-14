import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { DEFAULT_THEME } from "../data/constants";

export const usePersistStore = create(
  persist(
    (set) => ({
      theme: DEFAULT_THEME,
      toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      balance: undefined,
      setBalance: (balance) => set({ balance }),
      contractBalance: undefined,
      setContractBalance: (balance) => set({ contractBalance: balance }),
      profit: undefined,
      setProfit: (profit) => set({ profit }),
    }),
    {
      name: "coinflip-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
