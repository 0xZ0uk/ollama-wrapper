import { Ollama } from "langchain/llms/ollama";

import { ChatOllama } from "langchain/chat_models/ollama";
import { StringOutputParser } from "langchain/schema/output_parser";

import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "langchain/stores/message/upstash_redis";
import { ConversationChain } from "langchain/chains";
import { env } from "@/env";

const memory = new BufferMemory({
  chatHistory: new UpstashRedisChatMessageHistory({
    sessionId: new Date().toISOString(), // Or some other unique identifier for the conversation
    sessionTTL: 300, // 5 minutes, omit this parameter to make sessions never expire
    config: {
      url: env.NEXT_PUBLIC_UPSTASH_URL,
      token: env.NEXT_PUBLIC_UPSTASH_TOKEN,
    },
  }),
});

export const ollamaChat = new ChatOllama({
  baseUrl: "http://localhost:11434", // Default value
  model: "orca-mini",
});

const ollamaChain = new ConversationChain({
  llm: ollamaChat,
  memory,
});

export const getChatCompletion = async (msg: string) => {
  const message = await ollamaChain.call({
    input: msg,
  });

  return message;
};

export const ollamaLLM = new Ollama({
  baseUrl: "http://localhost:11434", // Default value
  model: "orca-mini",
});

export const getCompletion = async (msg: string) => {
  const stream = await ollamaLLM.stream(msg);

  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return chunks.join("");
};
