"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

export default function ParentProvider({ children }: Props) {
  return (
    <>
      <AuthContextProvider>{children}</AuthContextProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            fontSize: 14,
          },
        }}
      />
    </>
  );
}
