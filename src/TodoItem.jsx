import React from "react";

const TodoItem = React.memo(function TodoItem({ todo, dispatch, totalRef }) {
  return (
    <li>
      {todo.title}: {todo.text} — {todo.status}
      <button
        onClick={() => {
          dispatch({ type: "DELETE_TODO", payload: todo.id });
          totalRef.current -= 1;
        }}
      >
        DELETE
      </button>
      <button onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}>
        TOGGLE
      </button>
    </li>
  );
});

export default TodoItem;
