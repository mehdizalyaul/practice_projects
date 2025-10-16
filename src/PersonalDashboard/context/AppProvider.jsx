import TaskProvider from "./TaskContext";
import ProfileProvider from "./ProfileContext";
import ThemeProvider from "./ThemeContext";
import NotificationProvider from "./NotificationContext";
import AuthProvider from "./AuthContext";
export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>
          <TaskProvider>
            <ProfileProvider>{children}</ProfileProvider>
          </TaskProvider>
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
