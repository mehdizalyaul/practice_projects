import {
  useReducer,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { AuthContext } from "./AuthContext";
import { TaskApi } from "../services/index";
export const TaskContext = createContext();

const initialTasks = {
  allTasks: [],
  myTasks: [],
  selectedTask: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_MY_TASKS":
      return { ...state, myTasks: action.payload };

    case "SET_TASKS":
      return { ...state, allTasks: action.payload };

    case "ADD_TASK":
      // Add to both allTasks (admin) and myTasks (if relevant)
      return {
        ...state,
        allTasks: [...state.allTasks, action.payload],
        myTasks: [...state.myTasks, action.payload],
      };

    case "UPDATE_TASK": {
      const update = (tasks) =>
        tasks.map((t) => (t.id === action.payload.id ? action.payload : t));

      return {
        ...state,
        allTasks: update(state.allTasks),
        myTasks: update(state.myTasks),
      };
    }

    case "DELETE_TASK":
      return {
        ...state,
        allTasks: state.allTasks.filter((t) => t.id !== action.payload),
        myTasks: state.myTasks.filter((t) => t.id !== action.payload),
      };

    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        allTasks: state.allTasks.map((t) =>
          t.id === action.payload.id
            ? { ...t, status: action.payload.status }
            : t
        ),
        myTasks: state.myTasks.map((t) =>
          t.id === action.payload.id
            ? { ...t, status: action.payload.status }
            : t
        ),
      };

    default:
      return state;
  }
};

export default function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const { token, user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        let data;

        if (user.role === "admin") {
          data = await TaskApi.getAllTasks(token);
          dispatch({ type: "SET_TASKS", payload: data });
        } else {
          data = await TaskApi.getTasksById(token, user.id);
          dispatch({ type: "SET_MY_TASKS", payload: data.tasks || [] });
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && user) fetchTasks();
  }, [token, user]);

  const { allTasks, myTasks, selectedTask } = tasks;

  const value = {
    allTasks,
    myTasks,
    selectedTask,
    dispatch,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
