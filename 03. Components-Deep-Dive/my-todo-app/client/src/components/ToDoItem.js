export default function ToDoItem(props) {
    let className = 'todo';

    if (props.isCompleted) {
        className += ' is-completed';
    }

    return (
        <tr className={className}>
            <td>{props.title}</td>
            <td>{props.isCompleted ? 'Completed' : 'Incompleted'}</td>
            <td className="todo-action">
                <button className="btn todo-btn" onClick={() => props.onClick(props._id)}>Change status</button>
            </td>
        </tr>
    );
}