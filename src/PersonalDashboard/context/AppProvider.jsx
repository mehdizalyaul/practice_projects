import TaskProvider from "./TaskContext";
import ProfileProvider from "./ProfileContext";
import ThemeProvider from "./ThemeContext";

export default function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <TaskProvider>
        <ProfileProvider>{children}</ProfileProvider>
      </TaskProvider>
    </ThemeProvider>
  );
}
