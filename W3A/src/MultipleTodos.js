import React from 'react';
// import { useParams, useSearchParams } from "react-router-dom";
import {createTodo, getMultipleTodos} from "./requests";
import {useEffect, useState} from "react";
import Todo from './Todo';
import './MultipleTodos.css'

function MultipleTodos() {
    // const params = useParams();
    const [shouldDisplayTodos, setShouldDisplayTodos] = useState(false)
    const [multipleTodos, setMultipleTodos] = useState([])
    const [newTodo, setNewTodo] = useState(undefined);
    useEffect(() => {
        getMultipleTodos().then((response) => {
            console.log("getMultipleTodos", response.data)
            setMultipleTodos(response.data);
            setShouldDisplayTodos(true);
        });
    }, []);
    // let [searchParams] = useSearchParams();
    let multipleTodosView = null;
    if (multipleTodos && multipleTodos.length) {
        multipleTodosView = multipleTodos.map((x) => (<Todo id={x.id} key={x.id}/>))
    }
    console.log(shouldDisplayTodos, "shouldDisplayTodos")
    return (
        <div>
            <h1 id="header">Todo List App</h1>
            <div id="input">
                <input onChange={(e) => {
                    setNewTodo({
                        "created": new Date(),
                        "text": "test todo 10",
                        "subtext": "Lorem ipsum do",
                        "completed": false
                    })
                }} type="text" placeholder="enter todo"/>
                <button onClick={() => {
                    console.log(newTodo, "send");
                    createTodo({todo: newTodo}).then((response) => {
                        console.log(response.data, "createTodo");
                        const createdTodo = response.data;
                        setMultipleTodos([...multipleTodos, createdTodo]);
                        setNewTodo({});
                    })
                }}>send
                </button>
            </div>
            <div id="options">
                <div>
                    <div>show only completed</div>
                    <input type="checkbox"/>
                </div>
                <div>
                    <div>show only todo</div>
                    <input type="checkbox"/>
                </div>
                <div>
                    <div>show all</div>
                    <input type="checkbox"/>
                </div>
            </div>
            <div id="todos-content">
                {shouldDisplayTodos && multipleTodosView}
            </div>
        </div>);
}

export default MultipleTodos;