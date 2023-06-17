import React from 'react';
// import { useParams, useSearchParams } from "react-router-dom";
import {createTodo, deleteAllCompleted, getMultipleTodos} from "./requests";
import {useEffect, useState} from "react";
import Todo from './Todo';
import './MultipleTodos.css'

const ONLY_COMPLETED = 'only_completed_w3'
const ONLY_TODO = 'only_todo_w3'

function MultipleTodos() {
    const [shouldDisplayTodos, setShouldDisplayTodos] = useState(false)
    const [multipleTodos, setMultipleTodos] = useState([])
    const [newTodo, setNewTodo] = useState(undefined);
    const onlyCompleted = JSON.parse(localStorage.getItem(ONLY_COMPLETED));
    const onlyTodo = JSON.parse(localStorage.getItem(ONLY_TODO));
    const [lsOnlyCompleted, setLsOnlyCompleted] = useState(onlyCompleted)
    const [lsOnlyTodo, setLsOnlyTodo] = useState(onlyTodo)
    useEffect(() => {
        getMultipleTodos({onlyCompleted, onlyTodo}).then((response) => {
            setMultipleTodos(response.data);
            setShouldDisplayTodos(true);
        });
    }, [lsOnlyCompleted, lsOnlyTodo]);
    let multipleTodosView = null;
    if (multipleTodos && multipleTodos.length) {
        multipleTodosView = multipleTodos.map((x) => (
            <Todo
                id={x._id}
                key={x._id}
                setShouldDisplayTodos={setShouldDisplayTodos}
                multipleTodos={multipleTodos}
                setMultipleTodos={setMultipleTodos}
            />))
    }
    return (
        <div>
            <h1 id="header">Todo List App</h1>
            <div id="input">
                <input onChange={(e) => {
                    setNewTodo({
                        "created": new Date(),
                        "text": e.target.value,
                        "subtext": e.target.value,
                        "completed": false
                    })
                }} type="text" placeholder="enter todo"/>
                <button onClick={() => {
                    createTodo({todo: newTodo}).then((response) => {
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
                    <input type="checkbox" checked={!!lsOnlyCompleted} onChange={(e) => {
                        localStorage.setItem(ONLY_COMPLETED, e.target.checked.toString())
                        setLsOnlyCompleted(e.target.checked)
                        setShouldDisplayTodos(true);
                    }}/>
                </div>
                <div>
                    <div>show only todo</div>
                    <input type="checkbox" checked={!!lsOnlyTodo} onChange={(e) => {
                        localStorage.setItem(ONLY_TODO, e.target.checked.toString())
                        setLsOnlyTodo(e.target.checked)
                        setShouldDisplayTodos(true);
                    }}/>
                </div>
                <div>
                    <button id="delete-all" onClick={() => {
                        deleteAllCompleted({onlyCompleted, onlyTodo}).then(() => {
                            const newTodos = multipleTodos.filter((x) => !x.completed);
                            console.log(newTodos, "after dlete all")
                            setMultipleTodos(newTodos);
                            setShouldDisplayTodos(true);
                        });
                    }}>
                        delete all completed
                    </button>
                </div>
            </div>
            <div id="todos-content">
                {shouldDisplayTodos && multipleTodosView}
            </div>
        </div>);
}

export default MultipleTodos;