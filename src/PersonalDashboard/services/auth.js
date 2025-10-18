const BACKEND_URL = "http://localhost:5000/api";

export const register = async (name, email, password) => {
  const res = await fetch(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });

  return await res.json();
};

export const login = async (email, password) => {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  return await res.json();
};
