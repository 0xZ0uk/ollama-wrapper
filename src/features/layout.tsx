import React from "react";
import { Sidebar } from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
};
