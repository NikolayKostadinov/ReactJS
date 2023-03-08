import { useEffect, useContext, useState } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import TaskEdit from '../edit-task/TaskEdit';
import styles from './TaskItem.module.css';

const TaskItem = ({ task }) => {
    const { taskDeleteHandler, taskCompletedHandler } = useContext(TaskContext);
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
        console.log(`Mounth ${task.name}`);
        return () => {
            console.log(`Unmounth ${task.name}`);
        };
    }, [task.name]);

    const classNames = [
        task.isCompleted ? styles.completed : styles.incompleted,
        styles["task-item"]
    ];

    return (
        <li>
            {isEdit
                ? <TaskEdit task={task} setIsEdit={setIsEdit}/>
                : <>
                    <span
                        className={classNames.join(" ")}
                        onClick={() => taskCompletedHandler(task)}>
                        {task.name}
                    </span>
                    <button
                        className={styles['btn-edit']}
                        onClick={() => { setIsEdit(e => !e) }}
                    >&lt;</button>
                    <button
                        className={styles['btn-clear']}
                        onClick={() => taskDeleteHandler(task._id)}
                    >X</button>
                </>
            }
        </li>
    );
}

export default TaskItem;