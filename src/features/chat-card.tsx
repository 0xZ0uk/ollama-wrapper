import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface ChatCardProps {
  title: string;
  onClick: () => void;
}

export const ChatCard: React.FC<ChatCardProps> = ({ title, onClick }) => {
  return (
    <Card className="hover:border-primary cursor-pointer" onClick={onClick}>
      <CardHeader className="p-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};
