import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import AuthProvider from "../contexts/AuthContext";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Citizen from "../pages/Citizen";
import Projects from '../pages/Projects' ;
import Requests from "../pages/Requests";
import Officers  from '../pages/Officers';
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import RequestDetails from "../pages/RequestDetails";
import DistrictIntelligence from "../pages/DistrictIntelligence";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login mode="register" />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/citizens" element={<Citizen />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/requests/:id" element={<RequestDetails />} />
              <Route path="/officers" element={<Officers />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/district-intelligence" element={<DistrictIntelligence />} />
            </Route>
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;