import { Ollama } from "langchain/llms/ollama";

export const ollama = new Ollama({
  baseUrl: "http://localhost:11434", // Default value
  model: "orca-mini",
});

export const getMessage = async (msg: string) => {
  const stream = await ollama.stream(msg);

  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return chunks.join("");
};
