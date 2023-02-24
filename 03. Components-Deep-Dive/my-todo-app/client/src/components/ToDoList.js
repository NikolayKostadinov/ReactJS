import { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";
export default function ToDoList(props) {
    const url = 'http://localhost:3030/jsonstore/todos';
    const [todoList, setTodoList] = useState();

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setTodoList(Object.values(data));
            })
    }, []);

    const clickHandler = (todoId) => {
        const todo = todoList.find(t => t._id === todoId);
        if (todo) {
            todo.isCompleted = !todo.isCompleted;
            fetch(url + `\\${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo),
            })
            .then((response) => response.json())
            .then((modified) => {
                setTodoList(todos => todos.map(x => x._id === todoId ? modified : x));
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        }
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="table-header-task">Task</th>
                    <th className="table-header-status">Status</th>
                    <th className="table-header-action">Action</th>
                </tr>
            </thead>
            <tbody>
                {todoList ?
                    todoList.map(todo => <ToDoItem key={todo._id} {...todo} onClick={clickHandler} />) :
                    <tr><td>Loading...</td></tr>}
            </tbody>
        </table>
    );
}