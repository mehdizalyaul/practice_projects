const BACKEND_URL = "http://localhost:5000/api";

export const getAllProfiles = async (token) => {
  const res = await fetch(`${BACKEND_URL}/profiles`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.message);
  }
  return await res.json();
};

export const addProfile = async (token, name) => {
  const res = await fetch(`${BACKEND_URL}/profiles`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    throw new Error(res.message);
  }
  return await res.json();
};

export const deleteProfile = async (token, id) => {
  const res = await fetch(`http://localhost:5000/profiles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(res.message);
  }
  return await res.json();
};
