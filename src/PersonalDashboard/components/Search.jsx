import "../styles/Search.css";
export default function Search({ search, setSearch }) {
  return (
    <div className="tasks-search">
      <input
        type="text"
        name="search"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
