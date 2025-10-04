import { useReducer, useState, useMemo, useCallback } from "react";
import TaskList from "./TaskList";

const initialState = {
  tasks: [],
  score: 0,
  bonus: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: Date.now(), title: action.payload, status: "Incompleted" },
        ],
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                status:
                  task.status === "Completed" ? "Incompleted" : "Completed",
              }
            : task
        ),
      };
    case "INCREMENT_SCORE":
      return { ...state, score: state.score + 1 };
    case "INCREMENT_BONUS":
      return { ...state, bonus: state.bonus + 1 };
    default:
      return state;
  }
}

export default function Dashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState("");

  const total = useMemo(() => {
    console.log("Recalculating total...");
    return state.score * 1000000;
  }, [state.score]);

  const toggleTask = useCallback((id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  }, []);

  function handleAddTask() {
    if (!title.trim()) return;
    dispatch({ type: "ADD_TASK", payload: title });
    setTitle("");
  }

  return (
    <>
      <h2>Dashboard</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <TaskList tasks={state.tasks} toggleTask={toggleTask} />

      <h3>Score: {state.score}</h3>
      <h3>Bonus: {state.bonus}</h3>
      <h3>Total: {total}</h3>
      <button onClick={() => dispatch({ type: "INCREMENT_SCORE" })}>
        Increment Score
      </button>
      <button onClick={() => dispatch({ type: "INCREMENT_BONUS" })}>
        Increment Bonus
      </button>
    </>
  );
}
