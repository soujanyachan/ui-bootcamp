import axios from "axios";

export const getTodo = async (id) => {
    return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
}

export const getMultipleTodos = async () => {
    return axios.get('https://jsonplaceholder.typicode.com/todos');
}

export const updateTodo = async ({todo}) => {
    return axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
}

export const createTodo = async ({todo}) => {
    return axios.post(`https://jsonplaceholder.typicode.com/todos`, todo);
}