import { BACKEND_URL } from "../utils/constants";

export const getAllProfiles = async (token) => {
  const res = await fetch(`${BACKEND_URL}/profiles`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.message) {
    throw new Error(res.message);
  }
  return await res.json();
};

export const addProfile = async (token, name) => {
  const res = await fetch(`${BACKEND_URL}/profiles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const data = await res.json(); // read once

  if (!res.ok) {
    const message = data?.message[0]?.msg || "Something went wrong";
    const error = new Error(message);
    error.response = message;
    throw error;
  }

  return data;
};

export const deleteProfile = async (token, id) => {
  const res = await fetch(`${BACKEND_URL}/profiles/${id}`, {
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
