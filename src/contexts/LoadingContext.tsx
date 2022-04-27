import { Backdrop, CircularProgress } from "@mui/material";
import React, { createContext, useState } from "react";

interface LoadingContextProps {
  showLoading(): void;
  hideLoading(): void;
}

type Props = {
  children: React.ReactNode;
};

const LoadingContext = createContext({} as LoadingContextProps);

const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [visibleLoading, setVisibleLoading] = useState(false);

  const hideLoading = () => {
    setVisibleLoading(false);
  };

  const showLoading = () => {
    setVisibleLoading(true);
  };

  return (
    <LoadingContext.Provider
      value={{
        hideLoading,
        showLoading,
      }}
    >
      <Backdrop style={{ zIndex: 999999, color: "#fff" }} open={visibleLoading}>
        <CircularProgress size={50} color="secondary" />
      </Backdrop>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
