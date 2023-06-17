const config = require('./config');
const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    "created": {
        type: Date,
        default: Date.now()
    },
    "text": String,
    "subtext": String,
    "completed": Boolean
});
const conn = mongoose.createConnection(config.MONGODB.URL + '/' + config.MONGODB.REPELSET_OPTIONS, {
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000
});
const todoDB = conn.useDb('todos');

const Todo = todoDB.model('todos', todoSchema);

const createTodo = (todoData) => {
    console.log(todoData, "tododata")
    const todo = new Todo(todoData);
    return todo.save();
}

const updateTodo = (todoData) => {
    return Todo.findByIdAndUpdate(todoData.id, {...todoData, id: undefined});
}

const getAllTodos = () => {
    return Todo.find({});
}

const deleteTodo = (todoData) => {
    return Todo.findByIdAndRemove(todoData.id);
}

const getTodo = (todoData) => {
    return Todo.findById(todoData.id);
}

module.exports = {
    createTodo,
    updateTodo,
    getAllTodos,
    deleteTodo,
    getTodo
}
