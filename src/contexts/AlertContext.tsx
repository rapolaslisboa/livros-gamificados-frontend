import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { createContext, useState } from "react";

interface AlertContextSharedValues {
  error: {
    show: (alertMessage?: string | undefined) => void;
  };
  success: {
    show: (alertMessage: string) => void;
  };
}

const AlertContext = createContext({} as AlertContextSharedValues);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={1} {...props} />;
}

type AlertProviderProps = {
  children: React.ReactNode;
};

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "info" | "warning" | "error">(
    "info"
  );

  const handleCloseAlert = () => {
    setMessage(null);
  };

  const alert = {
    error: {
      show: (message?: string) => {
        setMessage(message ?? "Algo deu errado.");
        setType("error");
      },
    },
    success: {
      show: (message: string) => {
        setMessage(message);
        setType("success");
      },
    },
  };

  return (
    <AlertContext.Provider value={alert}>
      {children}
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={type} elevation={0}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };

