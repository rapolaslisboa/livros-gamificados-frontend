import { Backdrop, CircularProgress } from "@mui/material";
import React, { ReactNode } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

interface Props {
  children?: ReactNode;
  showLoading: jest.Mock<any, any>;
  hideLoading: jest.Mock<any, any>;
}

const MockedLoadingProvider = ({
  children,
  showLoading,
  hideLoading,
}: Props) => {
  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        hideLoading,
      }}
    >
      <CircularProgress
        data-testid="Loading.Progress"
        size={50}
        color="secondary"
      />
      {children}
    </LoadingContext.Provider>
  );
};

export { MockedLoadingProvider };
