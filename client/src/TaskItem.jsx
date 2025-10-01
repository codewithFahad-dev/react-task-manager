import { FaPen, FaTrash } from "react-icons/fa";
import { useAppContext } from "./context";
import { toast } from "react-toastify";

const TaskItem = ({ _id: id, task, isCompleted }) => {
  const { completeTask, deleteTask, setIsEditingID, setToastID } =
    useAppContext();

  const handleChange = () => {
    completeTask(id, !isCompleted);
  };

  const handleEdit = () => {
    const toastId = toast.loading("Editing mode...");
    setToastID(toastId);
    setIsEditingID(id);
  };

  return (
    <li className="task-item">
      <input
        id={id}
        type="checkbox"
        checked={isCompleted}
        onChange={handleChange}
        minLength={3}
        maxLength={150}
      />
      <label htmlFor={id}>{task}</label>

      <div className="btn-container">
        <button type="button" className="btn-icon" onClick={handleEdit}>
          <FaPen />
        </button>
        <button
          type="button"
          className="btn-icon"
          onClick={() => deleteTask(id)}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
