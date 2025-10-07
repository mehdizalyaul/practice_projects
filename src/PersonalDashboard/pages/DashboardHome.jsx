import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { ProfileContext } from "../context/ProfileContext";
import "../styles/DashboardHome.css";

export default function DashboardHome() {
  const { state } = useContext(TaskContext);
  const { profiles } = useContext(ProfileContext);

  return (
    <div className="dashboard-container">
      <h2>Dashboard Home</h2>
      <p>
        Tasks number is <span>{state.tasks.length}</span>
      </p>
      <p>
        Profiles number is <span>{profiles.length}</span>
      </p>
    </div>
  );
}
