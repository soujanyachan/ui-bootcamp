// text, completed, due date, label
import 'remixicon/fonts/remixicon.css'
import * as _ from 'lodash';
import * as constants from "./utils/constants";
import {useState} from "react";

function Todo(props) {
    // remove isTodoCompleted
    const [isTodoCompleted, setIsTodoCompleted] = useState(props.todo.completed)
    const setShouldUpdateTodos = props.setShouldUpdateTodos
    const updateTodoStatus = (completed) => {
        const todoData = localStorage.getItem(constants.localStorageKey)
        const todos = JSON.parse(todoData)
        const index = _.findIndex(todos, (x) => x.id === props.todo.id)
        console.log("updateTodoStatus", index, todos)
        if (index >= 0) {
            todos[index].completed = completed
        }
        localStorage.setItem(constants.localStorageKey, JSON.stringify(todos))
        setIsTodoCompleted(completed)
        setShouldUpdateTodos()
    }

    const deleteTodoFromLocalStorage = () => {
        const todoData = localStorage.getItem(constants.localStorageKey)
        let todos = JSON.parse(todoData)
        const index = _.findIndex(todos, (x) => x.id === props.todo.id)
        console.log("deleteTodoFromLocalStorage 1", index, todos)
        _.remove(todos, (x) => x.id === props.todo.id)
        localStorage.setItem(constants.localStorageKey, JSON.stringify(todos))
        console.log("deleteTodoFromLocalStorage 2", todos)
        setShouldUpdateTodos()
    }

    return <div className="Todo">
        <input type="checkbox"
               id={`${props.activeTab}-content-checkbox-${props.todo.id}`}
               key={`${props.activeTab}-content-checkbox-${props.todo.id}`}
               checked={!!isTodoCompleted}
               onChange={(e) => {
                console.log("todo onChange", e.target.checked, e.target.value, props.todo.id);
                updateTodoStatus(e.target.checked);
               }}
        />
        <label>{props.todo.text}</label>
        {props.activeTab === 'completed' ? <i className={"ri-delete-bin-7-fill"} onClick={deleteTodoFromLocalStorage}></i>: null}
    </div>;
}

export default Todo;