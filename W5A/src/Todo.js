import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {deleteTodo, getTodo, updateTodo} from "./requests";
import {useEffect, useContext} from 'react';
import _ from 'lodash';
import 'remixicon/fonts/remixicon.css'
import {MultipleTodosContext, SetMultipleTodosContext, SelectedTodoIdContext} from './Context'

function Todo() {
    const multipleTodos = useContext(MultipleTodosContext)
    const setMultipleTodos = useContext(SetMultipleTodosContext)
    const params = useParams();
    const id = params.id || useContext(SelectedTodoIdContext);
    const [todo, setTodo] = useState({})
    const [shouldDisplayTodos, setShouldDisplayTodos] = useState(false)
    useEffect(() => {
        getTodo(id).then((response) => {
            setTodo(response.data);
            setShouldDisplayTodos(true);
        });
    }, []);

    const setAndUpdateTodo = ({todo, completed}) => {
        updateTodo({todo: {...todo, completed}})
            .then(r => {
                setTodo({...todo, completed});
                const index = _.findIndex(multipleTodos, (x) => (x._id === todo._id))
                console.log(multipleTodos, index, todo, "index")
                multipleTodos[index].completed = completed;
                setMultipleTodos(multipleTodos)
                setShouldDisplayTodos(true);
            })
            .catch(e => console.log(e))
    }
    const todoStyle = todo.completed ? {"color":"red", "textDecoration":"line-through"} : {};
    return shouldDisplayTodos ? (<div>
            <a href={`/todos/${todo._id}`} style={todoStyle}>{todo.title || todo.text}</a>
            <input type="checkbox" checked={todo.completed} onChange={(e) => {
                setAndUpdateTodo({todo, completed: e.target.checked});
            }}/>
        <i className="ri-delete-bin-7-fill" onClick={() => {
            deleteTodo({todo})
                .then(r => {
                    const multipleTodosData = _.filter(multipleTodos, (x) => {return (x._id !== todo._id)})
                    setMultipleTodos(multipleTodosData)
                    setShouldDisplayTodos(true);
                })
                .catch(e => console.log(e))
        }}></i>
            {window.location.pathname !== "/" && (<p>{todo.subtext || "hello subtext"}</p>)}
        </div>) : undefined;
}

export default Todo;