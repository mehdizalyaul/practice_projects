import { useReducer, useEffect, useCallback, useRef, useState } from "react";
import Form from "./Form";
import TodoList from "../TodoList";

export default function TodoManager() {
  function reducer(state, action) {
    switch (action.type) {
      case "ADD_TODO":
        return [...state, action.payload];
      case "DELETE_TODO":
        return state.filter((todo) => todo.id !== action.payload);
      case "TOGGLE":
        return state.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                status:
                  todo.status === "Incomplete" ? "Completed" : "Incomplete",
              }
            : todo
        );
      default:
        return state;
    }
  }

  const [todos, dispatch] = useReducer(reducer, []);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const totalRef = useRef(0);

  useEffect(() => {
    totalRef.current = todos.length;
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key === "Enter") handleAddTodo();
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleAddTodo]);

  const handleAddTodo = useCallback(() => {
    if (!title.trim() || !text.trim()) {
      alert("Fill all the inputs");
      return;
    }
    dispatch({
      type: "ADD_TODO",
      payload: { id: Date.now(), title, text, status: "Incomplete" },
    });
    setTitle("");
    setText("");
    totalRef.current += 1;
    inputRef.current.focus();
  }, [text, title]);

  return (
    <>
      <h1>Count : {totalRef.current}</h1>
      <Form
        title={title}
        setTitle={setTitle}
        text={text}
        setText={setText}
        handleAddTodo={handleAddTodo}
        inputRef={inputRef}
      />
      <TodoList todos={todos} dispatch={dispatch} totalRef={totalRef} />
    </>
  );
}
