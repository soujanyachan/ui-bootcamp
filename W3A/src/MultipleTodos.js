import React from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import {getMultipleTodos} from "./requests";
import {useEffect, useState} from "react";
import Todo from './Todo';

function MultipleTodos() {
    const params = useParams();
    const [shouldDisplayTodos, setShouldDisplayTodos] = useState(false)
    const [multipleTodos, setMultipleTodos] = useState([])
    useEffect(() => {
        getMultipleTodos().then((response) => {
            console.log("getMultipleTodos", response.data)
            setMultipleTodos(response.data);
            setShouldDisplayTodos(true);
        });
    }, []);
    let [searchParams] = useSearchParams();
    console.log(params, searchParams, "params");
    let multipleTodosView = null;
    console.log(multipleTodos, "multipleTodos")
    if (multipleTodos && multipleTodos.length) {
        multipleTodosView = multipleTodos.map((x) => (<Todo id={x.id} key={x.id}/>))
    }
    console.log(shouldDisplayTodos, "shouldDisplayTodos")
    return (
        <div>
            <p>hello there from multiple todos</p>
            {/*get list of todos and render the list, paginated*/}
            {shouldDisplayTodos && multipleTodosView}
        </div>);
}

export default MultipleTodos;