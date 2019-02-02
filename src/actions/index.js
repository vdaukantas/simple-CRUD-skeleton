import axios from "axios";

export const FETCH_USERS = "fetch_users";
export const FETCH_USER = "fetch_user";

export const FETCH_TODO_LIST = "fetch_todo_list";
export const FILTER_LIST = "filter_list";

export const TASK_DELETE = "task_delete";
export const TASK_ADD = "task_add";
export const TASK_DONE = "task_done";
export const TASK_UNDONE = "task_undone";
export const TASK_EDIT = "task_edit";

const ROOT_URL = "https://jsonplaceholder.typicode.com";

export function fetchUsers() {
    const request = axios.get(`${ROOT_URL}/users`);

    return {
        type: FETCH_USERS,
        payload: request
    };
}

export function fetchUser(id) {
    const request = axios.get(`${ROOT_URL}/users/${id}`);

    return {
        type: FETCH_USER,
        payload: request
    };
}

export function fetchTodoList(id) {
    const request = axios.get(`${ROOT_URL}/users/${id}/todos`);

    return {
        type: FETCH_TODO_LIST,
        payload: request
    };
}

export function doListFiltering(filterBy) {
    return {
        type: FILTER_LIST,
        payload: filterBy
    };
}

export function doTaskDelete(taskId, callback) {
    axios.delete(`${ROOT_URL}/todos/${taskId}`)
        .then(() => callback());

    return {
        type: TASK_DELETE,
        payload: taskId
    };
}

export function doTaskAdd(task, callback) {
    const { title, user, id } = task;
    const tempData = {
        userId: user,
        completed: false,
        title,
        id
    };

    axios.post(`${ROOT_URL}/todos/`, tempData)
        .then(() => callback());

    return {
        type: TASK_ADD,
        payload: tempData
    };
}

export function doTaskDone(taskId) {
    axios.put(`${ROOT_URL}/todos/${taskId}`, {
        completed: true
    })

    return {
        type: TASK_DONE,
        payload: taskId
    };
}

export function doTaskUndone(taskId) {
    axios.put(`${ROOT_URL}/todos/${taskId}`, {
        completed: false
    })

    return {
        type: TASK_UNDONE,
        payload: taskId
    };
}

export function doTaskEdit(taskId, taskTitle) {
    const tasDetails = {
        id: taskId,
        title: taskTitle
    };

    axios.put(`${ROOT_URL}/todos/${taskId}`, tasDetails)

    return {
        type: TASK_EDIT,
        payload: tasDetails
    };
}