import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_API_BASE;

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    errorStatus: false,
    errorCode: null,
  });
  const [isEditingID, setIsEditingID] = useState(null);
  const [toastID, setToastID] = useState(null);
  const [filter, setFilter] = useState(
    () => JSON.parse(localStorage.getItem("filter")) || "All"
  );

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setIsError({ errorStatus: false, errorCode: null });
      const {
        data: { tasks },
      } = await axios.get(url);
      setTasks(tasks);
    } catch (error) {
      setIsError({ errorStatus: true, errorCode: error.status });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (filterValue) => {
    setFilter(filterValue);
  };

  const addTask = async (task) => {
    const tempId = Date.now();
    const newTask = {
      _id: tempId,
      task: task,
      isCompleted: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    try {
      const { data } = await axios.post(url, newTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === tempId ? data.task : task))
      );

      toast.success("Task added to the list");
    } catch (error) {
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== tempId));
      setIsError({ errorStatus: true, errorCode: error.status });
      toast.error(error?.response?.data?.msg);
    }
  };

  const completeTask = async (taskId, isCompleted) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === taskId ? { ...t, isCompleted } : t))
    );
    try {
      await axios.patch(`${url}/${taskId}`, {
        isCompleted,
      });
      if (isCompleted) {
        toast.success("Item completed successfully");
      } else {
        toast.success("Item marked incompleted successfully");
      }
      //   fetchTasks();
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.msg);
      setIsError({ errorStatus: true, errorCode: error.status });
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === taskId ? { ...t, isCompleted: !isCompleted } : t
        )
      );
    }
  };

  const editTask = async (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === isEditingID ? { ...t, task: task } : t))
    );
    try {
      await axios.put(`${url}/${isEditingID}`, {
        task,
      });
      toast.success("Item edited successfully");
    } catch (error) {
      setIsError({ errorStatus: true, errorCode: error.status });
      toast.error(error.response.data.msg);
    }
  };

  const deleteTask = async (taskId) => {
    const previousTasks = [...tasks];
    setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
    try {
      await axios.delete(`${url}/${taskId}`);
      //   fetchTasks();
      toast.success("Item deleted successfully");
    } catch (error) {
      toast.error("There was an error deleting the item");
      console.log(error.message);
      setIsError({ errorStatus: true, errorCode: error.status });
      setTasks(previousTasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("filter", JSON.stringify(filter));
  }, [filter]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        addTask,
        completeTask,
        deleteTask,
        isLoading,
        isError,
        isEditingID,
        setIsEditingID,
        editTask,
        filter,
        handleFilter,
        toastID,
        setToastID,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context not accessible");
  }
  return context;
};

export { AppProvider, useAppContext };
