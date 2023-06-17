import React, {useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {getTodos} from "./requests";
import {useEffect} from 'react';
function Todo() {
    const params = useParams();
    let [searchParams] = useSearchParams();
    const [todo, setTodo] = useState({})

    useEffect(() => {
        getTodos(1).then((response) => {
            console.log(response.data)
            setTodo(response.data);
        });
    }, []);
    console.log(params, searchParams, "params");
    return (<div>
        <p>hello there from todo {JSON.stringify(todo)}</p>
        </div>
    );
}

export default Todo;