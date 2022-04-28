import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import { RouteNames } from "./routes/RouteNames";
import { SignUp } from "./pages/Auth/SignUp";

const App = () => {
  const routes = (
    <Routes>
      <Route path={RouteNames.Login()} element={<Login />} />
      <Route path={RouteNames.SignUp()} element={<SignUp />} />
    </Routes>
  );

  return <Fragment>{routes}</Fragment>;
};

export { App };
