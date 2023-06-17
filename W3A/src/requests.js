import axios from "axios";

export const getTodos = (id) => {
    return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
}

export const getMultipleTodos = () => {
    return axios.get('https://jsonplaceholder.typicode.com/todos');
}