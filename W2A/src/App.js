import './App.css';
import Header from "./Header";
import Tabs from "./Tabs";
import TodoForm from "./TodoForm";
import MultipleTodos from "./MultipleTodos";
import {useState, useEffect} from "react";
import * as constants from "./utils/constants";
import * as _ from "lodash";

function App() {
    const [todos, setTodos] = useState([]);
    const localStorageTodos = localStorage.getItem(constants.localStorageKey)
    if (!localStorageTodos) {
        localStorage.setItem('w2a_todo', JSON.stringify([]));
    }
    // TODO: remove shouldUpdateTodos, isTodoCompleted.
    // TODO: not use local storage for all ations only in the beginning and end before leaving page.
    const [shouldUpdateTodos, setShouldUpdateTodos] = useState(0)
    const [activeTab, setActiveTab] = useState("all");
    console.log(todos, "todos")
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(constants.localStorageKey));
        let filteredTodos = [];
        if (activeTab === 'completed') {
            filteredTodos = _.filter(todos, (x) => x.completed === true)
        } else if (activeTab === 'active') {
            filteredTodos = _.filter(todos, (x) => x.completed === false)
        } else if (activeTab === 'all') {
            filteredTodos = todos;
        }
        console.log(filteredTodos, "filteredTodos")
        if (!_.isEmpty(filteredTodos)) {
            setTodos(filteredTodos);
        } else {
            console.log(filteredTodos, "filteredTodos before setting in local storage")
            setTodos(filteredTodos)
        }
    }, [activeTab, shouldUpdateTodos])

    const createNewTodoLocalStorage = (event) => {
        console.log(event.target[0].value, "setTodosLocalStorage")
        const todo = {id: Date.now(), text: event.target[0].value, completed: false};
        todos.push(todo);
        localStorage.setItem('w2a_todo', JSON.stringify(todos));
        setTodos(todos);
        setShouldUpdateTodos(shouldUpdateTodos + 1)
        event.target.reset({})
    }

    const loggedSetShouldUpdateTodos = () => {
        console.log("loggedSetShouldUpdateTodos", shouldUpdateTodos);
        return setShouldUpdateTodos(shouldUpdateTodos + 1)
    }

    const deleteAllCompletedTodosFromLocalStorage = () => {
        console.log("deleteAllCompletedTodosFromLocalStorage")
        const todoData = localStorage.getItem(constants.localStorageKey)
        let todos = JSON.parse(todoData)
        const filteredNonCompletedTodos = _.filter(todos, (x) => x.completed === false)
        localStorage.setItem(constants.localStorageKey, JSON.stringify(filteredNonCompletedTodos))
        loggedSetShouldUpdateTodos()
    }
    return (
        <div className="App">
            <Header/>
            <Tabs activeTab="all" setActiveTab={setActiveTab}/>
            <TodoForm activeTab={activeTab} setTodoFn={createNewTodoLocalStorage}/>
            <MultipleTodos
                key={shouldUpdateTodos}
                todos={todos}
                activeTab={activeTab}
                setShouldUpdateTodos={loggedSetShouldUpdateTodos}
                deleteAllCompletedTodosFromLocalStorage={deleteAllCompletedTodosFromLocalStorage}/>
        </div>
    );
}

export default App;
