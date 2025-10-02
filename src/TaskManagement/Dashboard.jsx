import { useReducer } from "react";

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

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Tasks</h3>
        {/* Task components will go here */}
      </div>
      <div>
        <h3>Scoreboard</h3>
        {/* Scoreboard components will go here */}
      </div>
    </div>
  );
}
