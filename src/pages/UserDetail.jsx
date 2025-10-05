import { useParams } from "react-router-dom";
import { users } from "./DashboardHome";

export default function UserDetail() {
  const { id } = useParams();
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) return <h2>User not found</h2>;

  return (
    <div>
      <h2>User Detail</h2>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
