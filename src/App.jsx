import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DashboardHome from "./PersonalDashboard/pages/DashboardHome";
import ProfilesPage from "./PersonalDashboard/pages/ProfilesPage";
import SettingsPage from "./PersonalDashboard/pages/SettingsPage";
import TasksPage from "./PersonalDashboard/pages/TasksPage";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link> | <Link to="/tasks">Tasks</Link> |{" "}
        <Link to="/profiles">Profiles</Link> |{" "}
        <Link to="/settings">Settings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />

        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}
