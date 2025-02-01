import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface ContainerProps {
  children: React.ReactElement;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
