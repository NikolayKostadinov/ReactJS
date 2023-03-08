
import { TaskContext } from "./contexts/TaskContext";
import TaskList from "./components/task-list/TaskList";
import styles from './App.module.css';
import CreateTask from "./components/create-task/CreateTask";
import useFetch from "./hooks/useFetch";
import useTasksApi from "./hooks/useTasksApi";



function App() {
  const baseUrl = `http://localhost:3030/jsonstore/tasks`;
  const [tasks, setTasks, isLoading] = useFetch(baseUrl, []);
  const [removeTask, createTask, updateTask] = useTasksApi();

  const taskCreateHandler = async (name) => {
    const newTask = await createTask(name);
    setTasks(state => [...state, newTask]);
  }

  const taskDeleteHandler = async (taskId) => {
    await removeTask(taskId);
    setTasks(state => state.filter(t => t._id !== taskId));
  }

  const taskCompletedHandler = async (task) => {
    await updateTask({ ...task, isCompleted: !task.isCompleted });
    setTasks(state => state.map(t => t._id !== task._id ? t : { ...t, isCompleted: !t.isCompleted }));
  }  
  
  const taskUpdateHandler = async (task) => {
    await updateTask({ ...task });
    setTasks(state => state.map(t => t._id !== task._id ? t : task));
  }

  return (
    <div className={styles['site-wrapper']}>
      <header>
        <h1>TODO App</h1>
      </header>
      <main>
        <TaskContext.Provider value={{ tasks, taskDeleteHandler, taskCreateHandler, taskCompletedHandler, taskUpdateHandler }}>
          {isLoading
            ? <p>Loading...</p>
            : <TaskList />
          }
          <CreateTask />
        </TaskContext.Provider>
      </main>
    </div>
  );
}

export default App;
