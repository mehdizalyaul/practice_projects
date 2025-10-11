import { useReducer, createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

const initialTasks = [];

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((t) => t.id !== action.payload);
    case "TOGGLE_TASK":
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
    default:
      return state;
  }
};

export default function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();
        dispatch({ type: "SET_TASKS", payload: data });
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const value = { tasks, dispatch, loading, error };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
