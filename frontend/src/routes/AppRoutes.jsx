import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import ContractorLayout from "../layouts/ContractorLayout.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import CreateUser from "../pages/admin/CreateUser.jsx";
import ManageUsers from "../pages/admin/ManageUsers.jsx";
import ManagerDashboard from "../pages/ManagerDashboard.jsx";
import Materials from "../pages/contractor/Materials.jsx";
import Orders from "../pages/contractor/Orders.jsx";
import Profile from "../pages/contractor/Profile.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    <Route
      path="/admin"
      element={
        <PrivateRoute allowedRoles={["ADMIN"]}>
          <Navigate to="/admin/dashboard" replace />
        </PrivateRoute>
      }
    />
    <Route
      element={
        <PrivateRoute allowedRoles={["ADMIN"]}>
          <AdminLayout />
        </PrivateRoute>
      }
    >
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/users/create" element={<CreateUser />} />
      <Route path="/admin/users" element={<ManageUsers />} />
    </Route>
    <Route
      path="/manager/dashboard"
      element={
        <PrivateRoute allowedRoles={["MANAGER", "ADMIN"]}>
          <ManagerDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/contractor"
      element={
        <PrivateRoute allowedRoles={["CONTRACTOR"]}>
          <Navigate to="/contractor/materials" replace />
        </PrivateRoute>
      }
    />
    <Route
      element={
        <PrivateRoute allowedRoles={["CONTRACTOR"]}>
          <ContractorLayout />
        </PrivateRoute>
      }
    >
      <Route path="/contractor/materials" element={<Materials />} />
      <Route path="/contractor/orders" element={<Orders />} />
      <Route path="/contractor/profile" element={<Profile />} />
    </Route>
  </Routes>
);

export default AppRoutes;

