const {allowedTabs} = require('./utils/constants')

function TodoForm(props) {
    return allowedTabs.includes(props.activeTab) ? (
        <div className="TodoForm">
            <form name="save-todo" id={`${props.activeTab}-form`} onSubmit={props.setTodoFn}>
                <label>
                    <input className="input-details" id={`${props.activeTab}-form-text-input`} placeholder="add details"/>
                    <button className="input-button" type="submit">add</button>
                </label>
            </form>
        </div>
    ) : null;
}

export default TodoForm;