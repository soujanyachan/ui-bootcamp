import React, {useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {getTodo, updateTodo} from "./requests";
import {useEffect} from 'react';
function Todo(props) {
    const params = useParams();
    const id = params.id || props.id;
    let [searchParams] = useSearchParams();
    const [todo, setTodo] = useState({})
    const [shouldDisplayTodos, setShouldDisplayTodos] = useState(false)

    useEffect(() => {
        getTodo(id).then((response) => {
            console.log(response.data)
            setTodo(response.data);
            setShouldDisplayTodos(true);
        });
    }, []);

    const setAndUpdateTodo = ({todo, completed}) => {
        updateTodo({todo: {...todo, completed}})
            .then(r => {
                console.log(r);
                setTodo({...todo, completed});
            })
            .catch(e => console.log(e))
    }
    console.log(params, searchParams, "params");
    const todoStyle = todo.completed ? {"color":"red", "textDecoration":"line-through"} : {};
    return shouldDisplayTodos ? (<div>
        <span>{todo.id} </span>
            <a href={`/todos/${todo.id}`} style={todoStyle}>{todo.title || todo.text}</a>
            <input type="checkbox" checked={todo.completed} onChange={(e) => {
                console.log(e.target.checked)
                setAndUpdateTodo({todo, completed: e.target.checked});
            }}/>
        </div>) : undefined;
}

export default Todo;