import React from 'react';
import {useParams} from 'react-router-dom';
import {deleteTodoAPI, getTodoAPI, updateTodoAPI} from "./requests";
import {getAllTodos, updateTodoToCompleted, selectedTodo} from './redux/TodoSlice'
import _ from 'lodash';
import 'remixicon/fonts/remixicon.css'
import {useSelector, useDispatch} from "react-redux";

function Todo(props) {
    const dispatch = useDispatch();
    const multipleTodos = useSelector((state) => {
        return state.todoReducer.multipleTodos
    })
    const params = useParams();
    const id = params.id || props.id;
    let todo = _.find(multipleTodos, (x) => x._id === id)

    if (!todo) {
        getTodoAPI(id).then((response) => {
            dispatch(selectedTodo(response.data))
        })
        todo = useSelector((state) => {
            return state.todoReducer.selectedTodo
        })
    }

    const setAndUpdateTodo = ({todo, completed}) => {
        updateTodoAPI({todo: {...todo, completed}})
            .then(r => {
                dispatch(updateTodoToCompleted({id: todo._id, completed}))
                const index = _.findIndex(multipleTodos, (x) => (x._id === todo._id))
                console.log(multipleTodos, index, todo, "index")
                const newTodos = _.cloneDeep(multipleTodos);
                newTodos[index].completed = completed;
                dispatch(getAllTodos(newTodos))
            })
            .catch(e => console.log(e))
    }
    const todoStyle = todo.completed ? {"color":"red", "textDecoration":"line-through"} : {};
    return <div>
            <a href={`/todos/${todo._id}`} style={todoStyle}>{todo.title || todo.text}</a>
            <input type="checkbox" checked={todo.completed} onChange={(e) => {
                setAndUpdateTodo({todo, completed: e.target.checked});
            }}/>
        <i className="ri-delete-bin-7-fill" onClick={() => {
            deleteTodoAPI({todo})
                .then(r => {
                    const multipleTodosData = _.filter(multipleTodos, (x) => (x._id !== todo._id))
                    dispatch(getAllTodos(multipleTodosData))
                })
                .catch(e => console.log(e))
        }}></i>
            {window.location.pathname !== "/" && (<p>{todo.subtext || "hello subtext"}</p>)}
        </div>;
}

export default Todo;