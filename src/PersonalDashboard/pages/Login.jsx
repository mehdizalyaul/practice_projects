import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Error from "../components/Error";

import "../styles/Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(email, password);

      // check if user exists
      if (!res || !res.user) {
        setError(res?.message || "Login failed");
        return;
      }

      const role = res.user.role;

      if (!role) {
        setError("User role not available yet");
        return;
      }

      if (role === "admin") {
        navigate("/");
      } else if (role === "user") {
        navigate("/tasks/mine");
      } else {
        setError("Unknown role");
      }
    } catch (err) {
      setError(err.message || "Login error");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Error message={error} />}

        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}
