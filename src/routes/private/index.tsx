import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../../pages/Main/Dashboard";
import { NotFound } from "../../pages/NotFound";
import { RouteNames } from "../RouteNames";

const PrivateRoutes = () => (
  <Routes>
    <Route path={RouteNames.Dashboard()} element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export { PrivateRoutes };
