import TaskProvider from "./TaskContext";
import ProfileProvider from "./ProfileContext";
import ThemeProvider from "./ThemeContext";
import NotificationProvider from "./NotificationContext";
import AuthProvider from "./AuthContext";
import { SearchProvider } from "./SearchContext";
export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>
          <SearchProvider>
            <TaskProvider>
              <ProfileProvider>{children}</ProfileProvider>
            </TaskProvider>
          </SearchProvider>
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
