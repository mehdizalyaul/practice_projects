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

export const getTasksById = async (token, id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/tasks/user/${id}`, {
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

export const updateTaskStatus = async (token, id, status) => {
  try {
    const res = await fetch(`${BACKEND_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
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

export const createTask = async (token, title, description) => {
  const res = await fetch(`${BACKEND_URL}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.log("Yes error");

    // handle both array and string cases
    const message = Array.isArray(data?.message)
      ? data.message[0]?.msg
      : data?.message || "Something went wrong";

    const err = new Error(message);
    err.response = message;
    throw err;
  }

  return data;
};
