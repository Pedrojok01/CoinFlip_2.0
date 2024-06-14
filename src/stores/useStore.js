import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const useStore = create((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        { ...transaction, onCreatedTimeStamp: new Date(), type: "transaction", id: transaction.hash },
      ],
    })),
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, onCreatedTimeStamp: new Date(), type: "notification", id: uuidv4() },
      ],
    })),
  reset: () =>
    set({
      transactions: [],
      notifications: [],
    }),
}));
