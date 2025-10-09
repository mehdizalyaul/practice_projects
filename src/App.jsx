import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DashboardHome from "./PersonalDashboard/pages/DashboardHome";
import ProfilesPage from "./PersonalDashboard/pages/ProfilesPage";
import SettingsPage from "./PersonalDashboard/pages/SettingsPage";
import TasksPage from "./PersonalDashboard/pages/TasksPage";
import Navbar from "./PersonalDashboard/components/Navbar";
import TaskDetails from "./PersonalDashboard/pages/TaskDetails";
import "./PersonalDashboard/styles/global.css";
import Notification from "./PersonalDashboard/components/Notification";
export default function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<DashboardHome />} />

        <Route path="/tasks" element={<TasksPage />}>
          <Route path=":id" element={<TaskDetails />} />
        </Route>
        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Notification />
    </div>
  );
}
