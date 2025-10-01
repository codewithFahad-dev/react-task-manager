import TaskItem from "./TaskItem";
import { useAppContext } from "./context";

const TaskList = () => {
  const { tasks, isLoading, filter } = useAppContext();

  let activeTasks;
  if (filter === "All") {
    activeTasks = tasks;
  } else if (filter === "Active") {
    activeTasks = tasks.filter((task) => !task.isCompleted);
  } else if (filter === "Completed") {
    activeTasks = tasks.filter((task) => task.isCompleted);
  }

  if (isLoading) {
    return (
      <ul className="task-list">
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </ul>
    );
  }

  if (activeTasks.length === 0) {
    return (
      <ul className="task-list">
        <p>Start adding tasks to the list 📃</p>
      </ul>
    );
  }

  return (
    <ul className="task-list">
      {activeTasks.map((item) => {
        return <TaskItem key={item._id} {...item} />;
      })}
    </ul>
  );
};

export default TaskList;
