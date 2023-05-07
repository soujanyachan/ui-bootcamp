import Todo from "./Todo";

function MultipleTodos(props) {
    console.log(props.todos, props.shouldUpdateTodos, "todos in MultipleTodos")
    const data = props.todos.map((todo) => {
        return <Todo activeTab={props.activeTab} todo={todo} key={`multiple-todos-${todo.id}`} setShouldUpdateTodos={props.setShouldUpdateTodos}/>
    });

    console.log(data, "data from multiple")
    return (
        <>
            <div className={`MultipleTodos ${props.activeTab}-content`}>
                {data}
            </div>
            {props.activeTab === 'completed' ? <button className="delete-all-button" onClick={props.deleteAllCompletedTodosFromLocalStorage}>delete all completed</button> : null}
        </>
    );
}

export default MultipleTodos;