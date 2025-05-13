import { ReactNode } from "react";
import { AppNavbar } from "./app-navbar";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <AppNavbar />
      <main className="w-[80%] py-6 m-auto">{children}</main>
    </div>
  );
};
