import TaskProvider from "./TaskContext";
import ProfileProvider from "./ProfileContext";
import ThemeProvider from "./ThemeContext";
import NotificationProvider from "./NotificationContext";
export default function AppProvider({ children }) {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <TaskProvider>
          <ProfileProvider>{children}</ProfileProvider>
        </TaskProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
}
