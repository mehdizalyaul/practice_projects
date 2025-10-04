import { useContext } from "react";
import { UserContext } from "./Context";

export default function Profile() {
  const { setUser } = useContext(UserContext);

  function handleLogin() {
    setUser({ name: "Mehdi", role: "Student" });
  }

  function handleLogOut() {
    setUser(null);
  }

  return (
    <div>
      <h2>Profile Component</h2>
      <button onClick={handleLogin}>Login as Mehdi</button>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}
