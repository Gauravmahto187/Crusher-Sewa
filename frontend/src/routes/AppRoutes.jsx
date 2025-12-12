import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import ContractorDashboard from "../pages/ContractorDashboard.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    <Route
      path="/admin/dashboard"
      element={
        <PrivateRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/contractor/dashboard"
      element={
        <PrivateRoute allowedRoles={["contractor", "admin"]}>
          <ContractorDashboard />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;

