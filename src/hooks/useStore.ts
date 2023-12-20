import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface GlobalState {
  message: string;
  setMessage: (message: string) => void;
}

export const useStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        message: "",
        setMessage: (message) => set({ message }),
      }),
      {
        name: "global-storage",
      },
    ),
  ),
);
