import Head from "next/head";

import { Layout } from "@/features/layout";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/features/chat-message";
import { Button } from "@/components/ui/button";
import { useStore } from "@/hooks/useStore";
import { DebugBox } from "@/features/debug-box";

export default function Home() {
  const { chats, message, setMessage, addMessageToChat, currentChat } =
    useStore();
  const createChatCompletion = async (message: string) => {
    const response = await currentChat?.chain?.call({ input: message });
    return response;
  };

  const handleSendMessage = async () => {
    if (message?.body === undefined) return;
    if (currentChat === undefined) return;

    addMessageToChat(currentChat?.id, message);

    setMessage({
      body: "",
      author: "you",
    });

    const msg = await createChatCompletion(message?.body);

    console.log(msg);

    if (msg === undefined) return;

    addMessageToChat(currentChat?.id, {
      body: msg.response,
      author: currentChat.model,
    });
  };

  return (
    <>
      <Head>
        <title>OllamaWrapper</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="" href="/favicon.png" />
      </Head>
      <Layout>
        <div className="flex h-full w-full flex-col justify-between p-4">
          <ScrollArea className="h-[80vh]">
            <DebugBox model={currentChat?.model ?? ""} />
            {chats
              .find((chat) => chat.id === currentChat?.id)
              ?.messages.map((msg, index) => (
                <ChatMessage key={index} author={msg.author}>
                  {msg.body}
                </ChatMessage>
              ))}
          </ScrollArea>
          <div className="grid w-full gap-2">
            <Textarea
              className="w-full"
              value={message?.body}
              onChange={(e) =>
                setMessage({
                  body: e.target.value,
                  author: "you",
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              placeholder={`Message ${currentChat?.model}...`}
            />
            <Button onClick={handleSendMessage}>Send message</Button>
          </div>
        </div>
      </Layout>
    </>
  );
}
