
import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const{ tasks } = useContext(TaskContext);
    return (
        <div>
            {tasks.length > 0
                ? <ul>
                    {tasks.map(t => <TaskItem key={t._id} task={t} />)}
                </ul>
                : <p>No tasks yet!</p>}
        </div>
    );
}
export default TaskList;