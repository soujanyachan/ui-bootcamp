import axios from "axios";
const baseUrl = 'http://localhost:5001'
export const getTodo = async (id) => {
    return axios.get(`${baseUrl}/todos/${id}`);
}

export const getMultipleTodos = async ({onlyCompleted, onlyTodo}) => {
    let query = {};
    if (onlyCompleted) {
        query.completed = true
    } else if (onlyTodo) {
        query.completed = false
    }
    return axios.get(`${baseUrl}/todos?query=${btoa(JSON.stringify(query))}`);
}

export const updateTodo = async ({todo}) => {
    return axios.put(`${baseUrl}/todos/${todo._id}`, todo);
}

export const createTodo = async ({todo}) => {
    return axios.post(`${baseUrl}/todos`, todo);
}

export const deleteTodo = async ({todo}) => {
    return axios.delete(`${baseUrl}/todos/${todo._id}`);
}

export const deleteAllCompleted = async (query) => {
    return axios.delete(`${baseUrl}/todos?query=${btoa(JSON.stringify(query))}`);
}