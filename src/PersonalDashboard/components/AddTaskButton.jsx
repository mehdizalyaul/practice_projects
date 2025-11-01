import { Plus } from "lucide-react";
import "../styles/AddTaskButton.css";
export default function AddTaskButton() {
  return (
    <button className="add-task">
      <Plus
        color={localStorage.getItem("theme") === "light" ? "white" : "#333"}
        size={25}
      />
      <p>Add a card</p>
    </button>
  );
}
