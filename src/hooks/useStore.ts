import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

type Message = {
  author: string;
  body: string;
};

interface GlobalState {
  message?: Message;
  messageHistory: Message[];
  setMessage: (message: Message) => void;
  addMessageToHistory: (message: Message) => void;
  clearMessageHistory: () => void;
}

export const useStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        message: undefined,
        messageHistory: [],
        setMessage: (message) => set({ message }),
        addMessageToHistory: (message) =>
          set((state) => ({
            messageHistory: [...state.messageHistory, message],
          })),
        clearMessageHistory: () => set({ messageHistory: [] }),
      }),
      {
        name: "global-storage",
      },
    ),
  ),
);
