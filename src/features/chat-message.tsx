import React from "react";

interface ChatMessageProps {
  author: string;
  children: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  author,
  children,
}) => {
  return (
    <div className="mb-6">
      <p className="text-muted-foreground text-xs tracking-widest">
        {author.toUpperCase()}
      </p>
      <div>{children}</div>
    </div>
  );
};
