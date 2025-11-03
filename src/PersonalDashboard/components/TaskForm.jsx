import { useState, useRef } from "react";
import { BookText, Type, Flag, Calendar, UserCircle2 } from "lucide-react";
import { STATUS } from "../utils/constants";
import capitalize from "../utils/capitalize";
import getStatusColor from "../utils/getStatusColor";
import "../styles/TaskForm.css";

export default function TaskForm({ task, addTask, updateTask }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "todo");
  const [priority, setPriority] = useState(task?.priority || "medium");
  const date = task?.dueDate
    ? new Date(task.dueDate).toISOString().split("T")[0]
    : "";
  const [dueDate, setDueDate] = useState(date);
  const [assignee, setAssignee] = useState(task?.assignee || "");
  const [operation, setOperation] = useState(task ? "update" : "add");
  const titleRef = useRef();
  console.log(dueDate);
  function handleSubmit(e) {
    const payload = {
      title,
      description,
      status,
      priority,
      dueDate,
      assignee,
    };
    e.preventDefault();
    if (operation === "update") {
      console.log(payload);
      updateTask({ ...payload, id: task?.id });
    } else {
      addTask(payload);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{operation === "update" ? "Edit Task" : "Create Task"}</h2>
      </div>

      {/* Title */}
      <label className="input-title">
        <Type size={18} />
        <span>Title</span>
      </label>
      <input
        type="text"
        value={title}
        ref={titleRef}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the task title"
        required
      />

      {/* Description */}
      <label className="input-title">
        <BookText size={18} />
        <span>Description</span>
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a detailed description"
        rows={3}
      ></textarea>

      {/* Status */}
      <label className="input-title">
        <Flag size={18} />
        <span>Status</span>
      </label>
      <select
        className="status-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          backgroundColor: getStatusColor(status),
          color: "#fff",
        }}
      >
        {STATUS.map((st) => (
          <option key={st} value={st} style={{ color: "black" }}>
            {capitalize(st)}
          </option>
        ))}
      </select>

      {/* Priority */}
      <label className="input-title">
        <Flag size={18} />
        <span>Priority</span>
      </label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={`priority-select priority-${priority}`}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Due Date */}
      <label className="input-title">
        <Calendar size={18} />
        <span>Due Date</span>
      </label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* Assignee */}
      <label className="input-title">
        <UserCircle2 size={18} />
        <span>Assigned To</span>
      </label>
      <input
        type="text"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
        placeholder="e.g. Mehdi"
      />

      <button type="submit" className="add-button">
        {operation === "update" ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
