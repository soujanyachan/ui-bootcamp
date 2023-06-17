import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {deleteTodo, getTodo, updateTodo} from "./requests";
import {useEffect} from 'react';
import _ from 'lodash';
import 'remixicon/fonts/remixicon.css'

function Todo(props) {
    const params = useParams();
    const id = params.id || props.id;
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
                const index = _.findIndex(props.multipleTodos, (x) => (x._id === todo._id))
                console.log(props.multipleTodos, index, todo, "index")
                props.multipleTodos[index].completed = completed;
                props.setMultipleTodos(props.multipleTodos)
                props.setShouldDisplayTodos(true);
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
                    const multipleTodos = _.filter(props.multipleTodos, (x) => {return (x._id !== todo._id)})
                    props.setMultipleTodos(multipleTodos)
                    props.setShouldDisplayTodos(true);
                })
                .catch(e => console.log(e))
        }}></i>
            {window.location.pathname !== "/" && (<p>{todo.subtext || "hello subtext"}</p>)}
        </div>) : undefined;
}

export default Todo;