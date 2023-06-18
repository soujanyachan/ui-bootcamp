import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name: 'newTodo',
    initialState: {
        multipleTodos: [],
        lsOnlyCompleted: false,
        lsOnlyTodo: false,
        selectedTodo: {}
    },
    reducers: {
        getAllTodos: (state, action) => {
            console.log(action.payload, "getalltodos")
            state.multipleTodos = action.payload
        },
        createNewTodo: (state, action) => {
                console.log("CREATE_NEW_TODO todoslice", action)
                const todo = {
                    "created": action.payload.created,
                    "text": action.payload.text,
                    "subtext": action.payload.subtext,
                    "completed": false
                };
                console.log("createNewTodo", JSON.stringify(todo), state);
                state.multipleTodos.push(todo);
        },
        updateTodoToCompleted: (state, action) => {
            const index = state.multipleTodos.findIndex((todo) => todo._id === action.payload.id);
            state.multipleTodos[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.multipleTodos.filter((todo) => todo._id !== action.payload.id);
        },
        deleteAllCompleted: (state, action) => {
            return state.multipleTodos.filter((todo) => !todo.completed);
        },
        setLs: (state, action) => {
            state.lsOnlyTodo = action.payload.lsOnlyTodo
            state.lsOnlyCompleted = action.payload.lsOnlyCompleted
        },
        selectedTodo: (state, action) => {
            state.selectedTodo = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { createNewTodo, updateTodoToCompleted, deleteTodo, getAllTodos, deleteAllCompleted, setLs, selectedTodo } = todoSlice.actions

export default todoSlice.reducer