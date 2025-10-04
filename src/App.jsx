import UserProvider from "./UserContext/UserContext.jsx";
import Profile from "./UserContext/Profile";
import Dashboard from "./UserContext/Dashboard";

export default function App() {
  return (
    <UserProvider>
      <div>
        <h1>App Component</h1>
        <Profile />
        <Dashboard />
      </div>
    </UserProvider>
  );
}
