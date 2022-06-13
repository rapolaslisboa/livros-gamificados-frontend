import React, { Fragment } from "react";
import { useAuth } from "./hooks/useAuth";
import { PrivateRoutes } from "./routes/private";
import { PublicRoutes } from "./routes/public";

const App = () => {
  const { authenticated } = useAuth();
  let routes = <PublicRoutes />;

  if (authenticated) {
    routes = <PrivateRoutes />;
  }

  return <Fragment>{routes}</Fragment>;
};

export { App };
