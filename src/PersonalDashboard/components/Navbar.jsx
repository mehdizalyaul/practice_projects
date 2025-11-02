import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext, AuthContext, SearchContext } from "../context";

import Search from "./Search";
import "../styles/Navbar.css";

export default function Navbar() {
  const { toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { search, setSearch } = useContext(SearchContext);
  return (
    <nav>
      <div>
        {user.role === "admin" && (
          <>
            <NavLink to="/" end>
              Dashboard
            </NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/profiles">Profiles</NavLink>
          </>
        )}

        {isAuthenticated && (
          <div className="navbar-navigation">
            <NavLink to="/tasks/mine">MyTasks</NavLink>
            <NavLink to="/settings">Settings</NavLink>
            <NavLink to="/login" onClick={logout}>
              Logout
            </NavLink>
          </div>
        )}
      </div>
      {isAuthenticated && <Search search={search} setSearch={setSearch} />}

      <div>
        <input
          type="checkbox"
          id="checkbox"
          className="checkbox"
          onChange={toggleTheme}
        />
        <label htmlFor="checkbox" className="checkbox-label">
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
          <span className="ball"></span>
        </label>
      </div>
    </nav>
  );
}
