import { useEffect, useRef, useState } from "react";
import { useAppContext } from "./context";
import { toast } from "react-toastify";

const Form = () => {
  const [task, setTask] = useState("");
  const inputRef = useRef(null);
  const {
    tasks,
    addTask,
    isEditingID,
    setIsEditingID,
    editTask,
    toastID,
    setToastID,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.length < 3) {
      toast.error("Please provide a value of atleast 3 characters");
      return;
    }
    if (isEditingID) {
      editTask(task);
    } else {
      addTask(task);
    }
    toast.dismiss(toastID);
    setToastID(null);
    setIsEditingID(null);
    setTask("");
  };

  useEffect(() => {
    if (!isEditingID) {
      return;
    }

    const taskToEdit = tasks.find((t) => t._id === isEditingID);

    inputRef.current.focus();
    inputRef.current.value = taskToEdit.task;
  }, [isEditingID]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
        ref={inputRef}
      />
      <button type="submit" className="form-btn">
        Add
      </button>
    </form>
  );
};

export default Form;
