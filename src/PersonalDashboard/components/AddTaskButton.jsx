import { Plus } from "lucide-react";
import "../styles/AddTaskButton.css";
import { useContext } from "react";
import { ThemeContext } from "../context";

export default function AddTaskButton({ onClickAdd }) {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      className="add-task"
      onClick={() => {
        onClickAdd();
      }}
    >
      <Plus color={theme === "dark" ? "white" : "#333"} size={25} />
      <p>Add a card</p>
    </button>
  );
}
