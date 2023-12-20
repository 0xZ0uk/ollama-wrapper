import { ConversationChain } from "langchain/chains";

export type ChatMessage = {
  author: string;
  body: string;
};

export type ChatModel =
  | "llama2"
  | "mistral"
  | "orca-mini"
  | "mixtral"
  | "dolphin-mixtral"
  | "code-llama";

export type Chat = {
  id: string;
  title: string;
  model: ChatModel;
  chain: ConversationChain;
  messages: ChatMessage[];
};
