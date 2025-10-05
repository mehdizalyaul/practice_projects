import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  function handleLogin() {
    setIsLoggedIn(true);
    navigate("/dashboard");
  }

  return <button onClick={handleLogin}>Login</button>;
}
