import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" end>
        Dashboard
      </NavLink>
      <NavLink to="/tasks">Tasks</NavLink>
      <NavLink to="/profiles">Profiles</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </nav>
  );
}
