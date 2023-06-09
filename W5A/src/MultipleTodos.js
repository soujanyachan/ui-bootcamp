import React from 'react';
import {createTodoAPI, deleteAllCompletedAPI, getMultipleTodosAPI} from "./requests";
import {useEffect} from "react";
import Todo from './Todo';
import './MultipleTodos.css'
import {useDispatch, useSelector} from 'react-redux'
import {createNewTodo, getAllTodos, deleteAllCompleted, setLs} from "./redux/TodoSlice";

const ONLY_COMPLETED = 'only_completed_w3'
const ONLY_TODO = 'only_todo_w3'

function MultipleTodos() {
    const dispatch = useDispatch();

    useEffect(() => {
        const lsOnlyCompleted = JSON.parse(localStorage.getItem(ONLY_COMPLETED));
        const lsOnlyTodo = JSON.parse(localStorage.getItem(ONLY_TODO));
        dispatch(setLs({lsOnlyCompleted, lsOnlyTodo}))
    }, [])
    const lsOnlyCompleted = useSelector((state) => state.todoReducer.lsOnlyCompleted)
    const lsOnlyTodo = useSelector((state) => state.todoReducer.lsOnlyTodo)
    console.log("{lsOnlyCompleted, lsOnlyTodo, selectedTodo}", {lsOnlyCompleted, lsOnlyTodo})

    useEffect(() => {
        getMultipleTodosAPI({lsOnlyCompleted, lsOnlyTodo}).then((response) => {
            dispatch(getAllTodos(response.data))
        });
    }, [lsOnlyCompleted, lsOnlyTodo]);
    let multipleTodos = useSelector((state) => {
        return state.todoReducer.filteredTodos
    })
    let multipleTodosView = null;
    console.log("multipleTodos from Multipletodos.js", multipleTodos);
    if (multipleTodos && multipleTodos.length && window.location.pathname === "/") {
        multipleTodosView = multipleTodos.map((x) => {
            return (
                <Todo key={x._id} id={x._id}/>
            )
        })
    }
    return (
        <div>
            <h1 id="header">Todo List App</h1>
            {(<div>
                <form id="input"
                      onSubmit={(event) => {
                          event.preventDefault();
                          console.log(event.target[0].value)
                          const text = event.target[0].value
                          const newTodo = {text, subtext: text, created: new Date().toString()}
                          createTodoAPI({todo: newTodo}).then((response) => {
                              dispatch(createNewTodo(newTodo));
                          })
                          event.target.reset();
                      }}
                >
                    <input type="text" placeholder="enter todo w5"/>
                    <button>send</button>
                </form>
                <div id="options">
                    <div>
                        <div>show only completed</div>
                        <input type="checkbox" checked={!!lsOnlyCompleted} onChange={(e) => {
                            localStorage.setItem(ONLY_COMPLETED, e.target.checked.toString())
                            dispatch(setLs({lsOnlyTodo, lsOnlyCompleted: e.target.checked}))
                        }}/>
                    </div>
                    <div>
                        <div>show only todo</div>
                        <input type="checkbox" checked={!!lsOnlyTodo} onChange={(e) => {
                            localStorage.setItem(ONLY_TODO, e.target.checked.toString())
                            dispatch(setLs({lsOnlyTodo: e.target.checked, lsOnlyCompleted}))
                        }}/>
                    </div>
                    <div>
                        <button id="delete-all" onClick={() => {
                            deleteAllCompletedAPI({lsOnlyCompleted, lsOnlyTodo}).then(() => {
                                dispatch(deleteAllCompleted())
                            });
                        }}>
                            delete all completed
                        </button>
                    </div>
                </div>
                <div id="todos-content">
                    {multipleTodosView}
                </div>
            </div>)}
        </div>
    );
}

export default MultipleTodos;