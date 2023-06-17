import axios from "axios";
const baseUrl = 'http://localhost:5001'
export const getTodo = async (id) => {
    return axios.get(`${baseUrl}/todos/${id}`);
}

export const getMultipleTodos = async () => {
    return axios.get(`${baseUrl}/todos`);
}

export const updateTodo = async ({todo}) => {
    console.log(todo, todo._id, "updateTodo")
    return axios.put(`${baseUrl}/todos/${todo._id}`, todo);
}

export const createTodo = async ({todo}) => {
    return axios.post(`${baseUrl}/todos`, todo);
}

export const deleteTodo = async ({todo}) => {
    return axios.delete(`${baseUrl}/todos/${todo._id}`);
}