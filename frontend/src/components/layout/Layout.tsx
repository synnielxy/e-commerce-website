import React, { ReactNode } from "react";
import Header from './Header'
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-4">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
