import TodoItem from "./TodoItem";
export default function TodoList({ todos, dispatch, totalRef }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          dispatch={dispatch}
          totalRef={totalRef}
        />
      ))}
    </ul>
  );
}
