import { useAppContext } from "./context";
import Form from "./Form";
import TaskList from "./TaskList";
import Error from "./Error";
import Filters from "./Filters";

function App() {
  const { isError } = useAppContext();

  if (isError.errorStatus) {
    return <Error errorCode={isError.errorCode} />;
  }
  return (
    <main className="app-container">
      <h1>Task Manager</h1>
      <Form />
      <TaskList />
      <Filters />
    </main>
  );
}

export default App;
