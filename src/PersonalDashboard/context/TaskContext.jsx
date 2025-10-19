import {
  useReducer,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { AuthContext } from "./AuthContext";
import * as TaskApi from "../services/index";
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
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const allTasks = await TaskApi.getAllTasks(token);

        dispatch({ type: "SET_TASKS", payload: allTasks });
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchTasks();
  }, [token]);

  const value = { tasks, dispatch, loading, error, setError, setLoading };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
