import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  const layoutStyle = {
    display: "flex",
  };

  const sidebarStyle = {
    width: "200px",
    borderRight: "1px solid #ccc",
    padding: "1rem",
  };

  const mainStyle = {
    flex: 1,
    padding: "1rem",
  };

  return (
    <div style={layoutStyle}>
      <div style={sidebarStyle}>
        <h3>Dashboard</h3>
        <Link to="/">Home</Link>
        <br />
        <Link to="/dashboard">Dashboard Home</Link>
      </div>
      <div style={mainStyle}>
        <Outlet />
      </div>
    </div>
  );
}
