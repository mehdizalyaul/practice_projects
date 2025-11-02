import { STATUS } from "../utils/constants";
import capitalize from "../utils/capitalize";
import getStatusColor from "../utils/getStatusColor";
import "../styles/TaskMenu.css";
import { useState } from "react";

export default function StatusMenu({ task, dispatch }) {
  const [selectedStatus, setSelectedStatus] = useState(task.status || "todo");

  function handleSelectStatus(e) {
    const value = e.target.value;
    setSelectedStatus(value);
    dispatch({
      type: "UPDATE_TASK_STATUS",
      payload: { id: task.id, status: value }, // use the new value here
    });
  }

  return (
    <select
      value={selectedStatus}
      onChange={handleSelectStatus}
      className="modal-task-status"
      style={{
        backgroundColor: getStatusColor(selectedStatus),
        color: "white",
        border: "none",
        appearance: "none",
        outline: "none",
      }}
      onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px rgba(0,0,0,0.2)")} // optional custom focus
      onBlur={(e) => (e.target.style.boxShadow = "none")}
    >
      {STATUS.map((st) => (
        <option
          key={st}
          value={st}
          style={{ backgroundColor: "white", color: "black" }}
        >
          {capitalize(st)}
        </option>
      ))}
    </select>
  );
}
