import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./PersonalDashboard/routes/ProtectedRoute";
import DashboardHome from "./PersonalDashboard/pages/DashboardHome";
import ProfilesPage from "./PersonalDashboard/pages/ProfilesPage";
import SettingsPage from "./PersonalDashboard/pages/SettingsPage";
import TasksPage from "./PersonalDashboard/pages/TasksPage";
import Login from "./PersonalDashboard/pages/Login";
import Register from "./PersonalDashboard/pages/Register";
import Navbar from "./PersonalDashboard/components/Navbar";
import TaskDetails from "./PersonalDashboard/pages/TaskDetails";
import Notification from "./PersonalDashboard/components/Notification";
import MyTasks from "./PersonalDashboard/pages/MyTasks";

import "./PersonalDashboard/styles/global.css";
import { useContext } from "react";
import { AuthContext } from "./PersonalDashboard/context/AuthContext";

export default function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {user.role === "admin" && (
            <Route path="/" element={<DashboardHome />} />
          )}
          <Route path="/tasks/mine" element={<MyTasks />} />

          {user.role === "admin" && (
            <Route path="/tasks" element={<TasksPage />}>
              <Route path=":id" element={<TaskDetails />} />
            </Route>
          )}
          {user.role === "admin" && (
            <Route path="/profiles" element={<ProfilesPage />} />
          )}
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      <Notification />
    </div>
  );
}
