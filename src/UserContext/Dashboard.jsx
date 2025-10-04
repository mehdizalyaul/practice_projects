import { useContext } from "react";
import { UserContext } from "./Context";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>Dashboard Component</h2>
      {user ? (
        <p>
          Welcome {user.name}, your role is {user.role}
        </p>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
}
