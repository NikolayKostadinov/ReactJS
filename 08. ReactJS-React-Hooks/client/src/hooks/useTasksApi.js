const url = 'http://localhost:3030/jsonstore/tasks';

const useTasksApi = () => {

    const removeTask = (taskId) => {
        return fetch(`${url}/${taskId}`, {
            method: 'DELETE',
        }).then(res => res.json())
    };

    const createTask = (name) => {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({name, isCompleted: false})
        }).then(res => res.json())
    };

    const updateTask = (task) => {
        return fetch(`${url}/${task._id}`, {
            method: 'PUT',
            body: JSON.stringify(task)
        }).then(res => res.json())
    };

    return [
        removeTask,
        createTask,
        updateTask,
    ]
};

export default useTasksApi;