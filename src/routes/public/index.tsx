import { Route, Routes } from "react-router-dom";
import { Login } from "../../pages/Auth/Login";
import { SignUp } from "../../pages/Auth/SignUp";
import { NotFound } from "../../pages/NotFound";
import { RouteNames } from "../RouteNames";

const PublicRoutes = () => (
  <Routes>
    <Route path={RouteNames.Login()} element={<Login />} />
    <Route path={RouteNames.SignUp()} element={<SignUp />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export { PublicRoutes };
