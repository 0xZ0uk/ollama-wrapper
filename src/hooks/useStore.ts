import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import type { Chat, ChatMessage, ChatModel } from "@/types/ollama";

interface GlobalState {
  model?: ChatModel;
  currentChat?: Chat;
  chats: Chat[];
  message?: ChatMessage;
  setCurrentChat: (chat: Chat) => void;
  setModel: (model: ChatModel) => void;
  setMessage: (message: ChatMessage) => void;
  addChat: (chat: Chat) => void;
  removeChat: (chat: Chat) => void;
  addMessageToChat: (chatId: string, message: ChatMessage) => void;
  setChatTitle: (chatId: string, title: string) => void;
}

export const useStore = create<GlobalState>()(
  devtools((set) => ({
    model: undefined,
    message: undefined,
    currentChat: undefined,
    messageHistory: [],
    chats: [],
    setModel: (model) => set({ model }),
    setMessage: (message) => set({ message }),
    setCurrentChat: (chat) => set({ currentChat: chat }),
    addChat: (chat) =>
      set((state) => ({
        chats: [...state.chats, chat],
      })),
    removeChat: (chat) =>
      set((state) => ({
        chats: state.chats.filter((c) => c.title !== chat.title),
      })),
    addMessageToChat: (chatId, message) =>
      set((state) => ({
        chats: state.chats.map((c) => {
          if (c.id === chatId) {
            return {
              ...c,
              messages: [...c.messages, message],
            };
          }
          return c;
        }),
      })),
    setChatTitle: (chatId, title) =>
      set((state) => ({
        chats: state.chats.map((c) => {
          if (c.id === chatId) {
            return {
              ...c,
              title,
            };
          }
          return c;
        }),
      })),
  })),
);
