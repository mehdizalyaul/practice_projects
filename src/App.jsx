import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashboardHome from "./pages/DashboardHome";
import Login from "./pages/Login";
import UserDetail from "./pages/UserDetail";
import NotRegistered from "./pages/NotRegistered";
import DashboardLayout from "./pages/DashboardLayout";
import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard/*"
          element={isLoggedIn ? <DashboardLayout /> : <NotRegistered />}
        >
          <Route index element={<DashboardHome />} />
          <Route path="user/:id" element={<UserDetail />} />
        </Route>

        <Route path="*" element={<h1>Page Not Found 404</h1>} />
      </Routes>
    </div>
  );
}
