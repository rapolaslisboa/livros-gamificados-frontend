import * as React from "react";
import { AlertProvider } from "./AlertContext";
import { AuthProvider } from "./AuthContext";
import { LoadingProvider } from "./LoadingContext";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => (
  <AlertProvider>
    <LoadingProvider>
      <AuthProvider>{children}</AuthProvider>
    </LoadingProvider>
  </AlertProvider>
);

export { AppProvider };
