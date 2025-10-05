import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        style={({ isActive }) => ({ color: isActive ? "red" : "blue" })}
      >
        Contact
      </NavLink>
    </nav>
  );
}
