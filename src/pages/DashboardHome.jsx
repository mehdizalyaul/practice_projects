import { Link } from "react-router-dom";
export const users = [
  { id: 1, name: "Alice", role: "Developer" },
  { id: 2, name: "Bob", role: "Designer" },
  { id: 3, name: "Charlie", role: "Analyst" },
];

export default function DashboardHome() {
  return (
    <div>
      <h2>Dashboard Home</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
