import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { RouteNames } from "./routes/RouteNames";

const App = () => {
  const routes = (
    <Routes>
      <Route path={RouteNames.Login()} element={<Login />} />
    </Routes>
  );

  return <Fragment>{routes}</Fragment>;
};

export { App };
