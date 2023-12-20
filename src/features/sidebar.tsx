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

export const Sidebar: React.FC = () => {
  return (
    <aside className="h-screen w-full basis-3/12 border-r">
      <div className="flex w-full items-center justify-between p-4">
        <h2 className="text-xl font-bold">OllamaWrapper</h2>
        <ModeToggle />
      </div>
      <div className="w-full p-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose a model" />
          </SelectTrigger>
          <SelectContent className={cn("font-sans", fontSans.variable)}>
            <SelectItem value="llama2">Llama2</SelectItem>
            <SelectItem value="mistral">Mistral</SelectItem>
            <SelectItem value="mixtral">Mixtral</SelectItem>
            <SelectItem value="dolphin-mixtral">Dolphin Mixtral</SelectItem>
            <SelectItem value="code-llama">Code LLama</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full space-y-2 p-4">
        <ChatCard title="Chat 1" />
        <ChatCard title="Chat 2" />
      </div>
    </aside>
  );
};
