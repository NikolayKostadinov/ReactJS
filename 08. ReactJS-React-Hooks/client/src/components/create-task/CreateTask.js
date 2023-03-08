import { useState, useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
const CreateTask = () => {
    const [task, setTask] = useState('');

    const{taskCreateHandler} = useContext(TaskContext);

    const onChange = (e) => {
        setTask(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        taskCreateHandler(task);
        setTask('');
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                id="task-name"
                name="taskName"
                placeholder="Do the dishes!"
                onChange={onChange}
                value={task}
            />
            <input type="submit" value="Add" />
        </form>
    );
}
export default CreateTask;