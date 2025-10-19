const BACKEND_URL = "http://localhost:5000/api";

export const getAllTasks = async (token) => {
  try {
    const res = await fetch(`${BACKEND_URL}/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(res.message);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTaskStatus = async (token, id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(res.message);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTask = async (token, id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(res.message);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createTask = async (token, title) => {
  const res = await fetch(`${BACKEND_URL}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  const data = await res.json();
  console.log(data.message[0].msg);
  if (!res.ok) {
    // Extract a clean error message
    const message = data?.message[0]?.msg || "Something went wrong";
    // Create and throw a proper error object
    const err = new Error(message);
    err.response = message;
    throw err;
  }

  // If request succeeded
  return data;
};
