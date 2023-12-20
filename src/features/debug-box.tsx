import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface DebugBoxProps {
  model: string;
}

export const DebugBox: React.FC<DebugBoxProps> = ({ model }) => {
  return (
    <Card className="mb-8 space-y-2">
      <CardHeader>
        <CardTitle className="text-lg">Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-sm">
            <span className="font-bold">Model:</span> {model}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
