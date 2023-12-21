import { ChatOllama } from "langchain/chat_models/ollama";
import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "langchain/stores/message/upstash_redis";
import { ConversationChain } from "langchain/chains";
import { env } from "@/env";
import type { ChatModel } from "@/types/ollama";

export const createChat = (
  sessionId: string,
  model: ChatModel,
): ConversationChain => {
  const memory = new BufferMemory({
    chatHistory: new UpstashRedisChatMessageHistory({
      sessionId, // Or some other unique identifier for the conversations
      config: {
        url: env.NEXT_PUBLIC_UPSTASH_URL,
        token: env.NEXT_PUBLIC_UPSTASH_TOKEN,
      },
    }),
  });

  const ollamaChat = new ChatOllama({
    baseUrl: env.NEXT_PUBLIC_OLLAMA_URL, // Default value
    model,
  });

  const ollamaChain = new ConversationChain({
    llm: ollamaChat,
    memory,
  });

  return ollamaChain;
};
