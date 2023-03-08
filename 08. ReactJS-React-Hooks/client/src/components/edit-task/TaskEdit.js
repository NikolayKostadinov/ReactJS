import { useState, useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";

const TaskEdit = ({ task, setIsEdit }) => {
    const {taskUpdateHandler} = useContext(TaskContext);
    const [editedTask, setEditedTask] = useState(task);
    const onSubmit = (ev) => {
        ev.preventDefault();
        taskUpdateHandler(editedTask);
        setIsEdit(false);
    }

    const onChangeHandler = (ev) => {
        setEditedTask({...editedTask, name: ev.target.value}) ;
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text"
                    name="name"
                    id="name"
                    onChange={onChangeHandler}
                    value={editedTask.name} />
                    <input type="submit" value="save" />
            </form>
        </>)
}
export default TaskEdit;