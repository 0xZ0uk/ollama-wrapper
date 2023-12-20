import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface ChatCardProps {
  title: string;
}

export const ChatCard: React.FC<ChatCardProps> = ({ title }) => {
  return (
    <Card className="hover:border-primary cursor-pointer">
      <CardHeader className="p-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};
