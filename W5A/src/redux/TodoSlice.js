import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name: 'newTodo',
    initialState: {
        multipleTodos: [],
        filteredTodos: [],
        lsOnlyCompleted: false,
        lsOnlyTodo: false,
        selectedTodo: {}
    },
    reducers: {
        getAllTodos: (state, action) => {
            console.log(action.payload, "getalltodos")
            state.multipleTodos = action.payload
            if (state.lsOnlyTodo && !state.lsOnlyCompleted) {
                state.filteredTodos = state.multipleTodos.filter((todo) => !todo.completed);
            } else if (!state.lsOnlyTodo && state.lsOnlyCompleted) {
                state.filteredTodos = state.multipleTodos.filter((todo) => todo.completed);
            } else {
                // create a new object for the state, and return it so that it's best practice.
                state.filteredTodos = state.multipleTodos
            }
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
                if (state.lsOnlyTodo) {
                    state.filteredTodos.push(todo)
                }
                // can make into a function.
                if (state.lsOnlyTodo && !state.lsOnlyCompleted) {
                    state.filteredTodos = state.multipleTodos.filter((todo) => !todo.completed);
                } else if (!state.lsOnlyTodo && state.lsOnlyCompleted) {
                    state.filteredTodos = state.multipleTodos.filter((todo) => todo.completed);
                } else {
                    state.filteredTodos = state.multipleTodos
                }
        },
        updateTodoToCompleted: (state, action) => {
            const index = state.multipleTodos.findIndex((todo) => todo._id === action.payload.id);
            state.multipleTodos[index].completed = action.payload.completed;
            if (state.lsOnlyTodo && !state.lsOnlyCompleted) {
                state.filteredTodos = state.multipleTodos.filter((todo) => !todo.completed);
            } else if (!state.lsOnlyTodo && state.lsOnlyCompleted) {
                state.filteredTodos = state.multipleTodos.filter((todo) => todo.completed);
            } else {
                state.filteredTodos = state.multipleTodos
            }
        },
        deleteTodo: (state, action) => {
            console.log(action, state, "detelettodo")
            return state.multipleTodos.filter((todo) => todo._id !== action.payload._id);
        },
        deleteAllCompleted: (state, action) => {
            state.multipleTodos = state.multipleTodos.filter((todo) => !todo.completed);
            console.log(state.multipleTodos, "deleteAllCompleted")
            state.filteredTodos = state.multipleTodos
        },
        setLs: (state, action) => {
            state.lsOnlyTodo = action.payload.lsOnlyTodo
            state.lsOnlyCompleted = action.payload.lsOnlyCompleted
            if (action.payload.lsOnlyTodo && !action.payload.lsOnlyCompleted) {
                state.filteredTodos = state.multipleTodos.filter((todo) => !todo.completed);
            } else if (!action.payload.lsOnlyTodo && action.payload.lsOnlyCompleted) {
                state.filteredTodos = state.multipleTodos.filter((todo) => todo.completed);
            } else {
                state.filteredTodos = state.multipleTodos
            }
        },
        selectedTodo: (state, action) => {
            state.selectedTodo = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { createNewTodo, updateTodoToCompleted, deleteTodo, getAllTodos, deleteAllCompleted, setLs, selectedTodo } = todoSlice.actions

export default todoSlice.reducer