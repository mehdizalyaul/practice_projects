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

export default function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/tasks" element={<TasksPage />}>
            <Route path=":id" element={<TaskDetails />} />
          </Route>
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/tasks/mine" element={<MyTasks />} />
        </Route>
      </Routes>
      <Notification />
    </div>
  );
}
