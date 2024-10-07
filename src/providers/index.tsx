import React from "react";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ProductProvider } from "../context/ProductContext";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>{children}</ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
