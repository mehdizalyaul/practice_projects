import { BACKEND_URL } from "../utils/constants";

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
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const payload = await res.json().catch(() => ({}));

    if (!res.ok) {
      // prefer server message, fallback to statusText or generic message
      const message =
        payload?.message || res.statusText || "Failed to update task";
      const err = new Error(message);
      err.status = res.status;
      err.payload = payload;
      throw err;
    }

    return payload; // parsed response
  } catch (error) {
    console.error("updateTaskStatus error:", error);
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

export const createTask = async (token, newTask) => {
  const res = await fetch(`${BACKEND_URL}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
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

export const updateTask = async (token, updatedTask) => {
  console.log("ghansard");
  const id = updatedTask.id;
  const res = await fetch(`${BACKEND_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
  const data = await res.json();
  console.log(data);

  if (!res.ok) {
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
