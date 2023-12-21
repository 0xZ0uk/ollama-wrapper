import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import { ChatCard } from "./chat-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { fontSans } from "@/utils/fonts";
import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/useStore";
import { v4 as uuidv4 } from "uuid";
import type { ChatModel } from "@/types/ollama";
import { createChat } from "@/lib/ollama";

export const Sidebar: React.FC = () => {
  const { model, setModel, chats, addChat, setCurrentChat } = useStore();

  const handleNewChat = async () => {
    if (model === undefined) return;

    const id = uuidv4();

    const ollamaChat = await createChat(id, model);

    addChat({
      id,
      title: "New Chat",
      model: model,
      chain: ollamaChat,
      messages: [],
    });

    setCurrentChat({
      id,
      title: "New Chat",
      model: model,
      chain: ollamaChat,
      messages: [],
    });
  };

  return (
    <aside className="h-screen w-full basis-3/12 border-r">
      <div className="flex w-full items-center justify-between p-4">
        <h2 className="text-xl font-bold">OllamaWrapper</h2>
        <ModeToggle />
      </div>
      <div className="w-full space-y-2 p-4">
        <Select
          value={model}
          onValueChange={(value) => setModel(value as ChatModel)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a model" />
          </SelectTrigger>
          <SelectContent className={cn("font-sans", fontSans.variable)}>
            <SelectItem value="llama2">Llama2</SelectItem>
            <SelectItem value="mistral">Mistral</SelectItem>
            <SelectItem value="mixtral">Mixtral</SelectItem>
            <SelectItem value="dolphin-mixtral">Dolphin Mixtral</SelectItem>
            <SelectItem value="code-llama">Code LLama</SelectItem>
            <SelectItem value="orca-mini">Orca Mini</SelectItem>
          </SelectContent>
        </Select>
        <Button
          className="w-full"
          disabled={model === undefined}
          onClick={
            model === undefined
              ? undefined
              : () => {
                  handleNewChat();
                }
          }
        >
          New Chat
        </Button>
      </div>
      <div className="w-full space-y-2 p-4">
        {chats.map((chat, index) => (
          <ChatCard
            key={index}
            title={chat.title}
            onClick={() => {
              setCurrentChat(chat);
            }}
          />
        ))}
      </div>
    </aside>
  );
};
