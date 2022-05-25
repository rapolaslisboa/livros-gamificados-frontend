import { Routes, Route } from "react-router-dom";
import { SignUp } from "../../pages/Auth/SignUp";
import { Dashboard } from "../../pages/Main/Dashboard";
import { Login } from "../../pages/Auth/Login";
import { RouteNames } from "../RouteNames";
import { NotFound } from "../../pages/NotFound";

const PublicRoutes = () => (
  <Routes>
    <Route path={RouteNames.Login()} element={<Login />} />
    <Route path={RouteNames.SignUp()} element={<SignUp />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export { PublicRoutes };
