import TaskProvider from "./TaskContext";
import ProfileProvider from "./ProfileContext";

export default function AppProvider({ children }) {
  return (
    <TaskProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </TaskProvider>
  );
}
