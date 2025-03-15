import { ReactNode } from "react";
import { AppNavbar } from "./app-navbar";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-screen flex flex-col bg-background border-2 border-green-400">
      <AppNavbar />
      <main className="w-[80%] h-full flex-grow-1 py-6 m-auto border-2 border-blue-400 overflow-scroll">
        {children}
      </main>
    </div>
  );
};
