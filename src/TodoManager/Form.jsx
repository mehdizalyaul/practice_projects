export default function Form({
  title,
  setTitle,
  text,
  setText,
  handleAddTodo,
  inputRef,
}) {
  return (
    <div>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        ref={inputRef}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="text"
        placeholder="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}
