import React, { ReactNode } from "react";
import Header from './Header'
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header className="fixed top-0 left-0 right-0 z-50"/>
      <main className="flex-1 mt-[54px] mb-[64px]">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      <Footer className="fixed bottom-0 left-0 right-0 z-40"/>
      <Toaster />
    </div>
  );
};

export default Layout;
