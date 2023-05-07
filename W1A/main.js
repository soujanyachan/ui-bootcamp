const saveTodo = (id) => {
    const formName = `${id}-form-text-input`
    const todos = document.getElementById(formName);
    console.log(todos)
    const todo = {id: Date.now(), text: todos.value, completed: false}
    const mergedTodoList = localStorage.getItem('all_todos');
    const newTodoList = [todo];
    console.log(todo)
    if (mergedTodoList) {
        const parsedList = JSON.parse(mergedTodoList);
        if (Array.isArray(parsedList)) {
            parsedList.push(todo);
            console.log(parsedList)
            localStorage.setItem('all_todos', JSON.stringify(parsedList))
        } else {
            console.log(todo)
            localStorage.setItem('all_todos', JSON.stringify(newTodoList))
        }
    } else {
        console.log(newTodoList)
        localStorage.setItem('all_todos', JSON.stringify(newTodoList))
    }
    document.getElementById(`${id}-form`).reset();
}

const deleteTodoById = (event) => {
    const completionId = event.target.parentElement.id;
    const splitCompletionId = completionId.split('-')
    const id = splitCompletionId[splitCompletionId.length - 1]
    console.log(completionId, event, id)
    const todoList = localStorage.getItem('all_todos');
    const parsedList = JSON.parse(todoList);
    const activeList = parsedList.filter((x) => x.id.toString() !== id);
    const toDelete = parsedList.filter((x) => x.id.toString() === id);
    console.log(parsedList, activeList, toDelete)
    localStorage.setItem('all_todos', JSON.stringify(activeList));
    for (const todo of toDelete) {
        const id = todo.id;
        console.log(id, "deleteAllCompletedTodos")
        const allId = document.getElementById(`all-content-${id}`);
        allId.remove();
        const completedId = document.getElementById(`completed-content-${id}`);
        completedId.remove();
    }
    renderTodos('completed');
}

const deleteAllCompletedTodos = () => {
    const todoList = localStorage.getItem('all_todos');
    const parsedList = JSON.parse(todoList);
    const activeList = parsedList.filter((x) => x.completed === false);
    const completedList = parsedList.filter((x) => x.completed === true);
    localStorage.setItem('all_todos', JSON.stringify(activeList));
    for (const todo of completedList) {
        const id = todo.id;
        console.log(id, "deleteAllCompletedTodos")
        const allId = document.getElementById(`all-content-${id}`);
        allId.remove();
        const completedId = document.getElementById(`completed-content-${id}`);
        completedId.remove();
    }
    renderTodos('completed');
}

const getTodos = (filter = 'all') => {
    const todoList = localStorage.getItem('all_todos');
    const parsedList = JSON.parse(todoList);
    if (filter === 'all') return parsedList;
    if (filter === 'active') return parsedList.filter((x) => x.completed === false);
    if (filter === 'completed') return parsedList.filter((x) => x.completed === true);
}

const renderTodos = (filter = 'all') => {
    const todos = getTodos(filter)
    console.log("rendertodos", filter, todos)
    let list = document.getElementById(`${filter}-content`);
    if (list) {
        const todoIds = [];
        todos.forEach((item) => {
            todoIds.push(item.id.toString());
            let isItemPresent = null
            try {
                isItemPresent = document.getElementById(`${filter}-content-${item.id}`)
            } catch (e) {
                console.log(e,"err")
            }
            console.log(isItemPresent, "isItemPresent", `${filter}-content#${item.id}`);
            if (!isItemPresent) {
                let li = document.createElement("li");
                const inputCheckbox = document.createElement("input");
                inputCheckbox.type = 'checkbox';
                inputCheckbox.onchange = (ev) => updateTodoCompletionStatus(ev, filter)
                inputCheckbox.id = `${filter}-content-checkbox-${item.id}`
                inputCheckbox.checked = item.completed
                const labelCheckbox = document.createElement("label");
                labelCheckbox.innerText = item.text;
                labelCheckbox.style = item.completed ? "text-decoration: line-through 2px" : ""
                li.id = `${filter}-content-${item.id}`;
                const span = document.createElement("span");
                span.appendChild(inputCheckbox)
                span.appendChild(labelCheckbox)
                li.appendChild(span)
                if (item.completed && filter === 'completed') {
                    // add the trash can
                    const trashIcon = document.createElement("i");
                    trashIcon.className= "ri-delete-bin-7-fill"
                    trashIcon.onclick = deleteTodoById
                    li.appendChild(trashIcon);
                }
                list.appendChild(li);
            }
        })
        // find the ones not in todos but in list and remove them
        console.log(list.childNodes,"list")
        const listIds = []
        for (let i=0;i<list.childNodes.length;i++) {
            const split = list.childNodes[i].id.split('-')
            listIds.push(split[split.length-1])
        }
        let intersection = listIds.filter(x => !todoIds.includes(x));
        console.log(listIds, todoIds, intersection, "intersection")
        intersection.forEach((id) => {
            const isItemPresent = document.getElementById(`${filter}-content-${id}`)
            isItemPresent.remove()
        })
    }
}

const updateTodoCompletionStatus = (event, filter) => {
    const completionStatus = event.target.checked;
    const completionId = event.target.id;
    const splitCompletionId = completionId.split('-')
    const id = splitCompletionId[splitCompletionId.length - 1]
    console.log(completionStatus, id)

    const liId = `${filter}-content-${id}`;
    const listItem = document.getElementById(liId)
    console.log(completionStatus, "completionStatus")
    if (completionStatus) {
        listItem.style = "text-decoration: line-through 3px"
    } else {
        listItem.removeAttribute("style")
    }

    if (filter === 'active') {
        const listId = `all-content-${id}`;
        const listingItem = document.getElementById(listId);
        if (completionStatus) {
            listingItem.style = "text-decoration: line-through 3px"
        } else {
            listingItem.removeAttribute("style")
        }
        const listCheckbox = document.getElementById(`all-content-checkbox-${id}`)
        const inputCheckbox = document.createElement("input");
        inputCheckbox.type = 'checkbox';
        inputCheckbox.onchange = (ev) => updateTodoCompletionStatus(ev, filter)
        inputCheckbox.id = `all-content-checkbox-${id}`;
        inputCheckbox.checked = completionStatus;
        listCheckbox.replaceWith(inputCheckbox)
    }

    const mergedTodoList = localStorage.getItem('all_todos');
    if (mergedTodoList) {
        const parsedList = JSON.parse(mergedTodoList);
        console.log(parsedList)
        if (Array.isArray(parsedList)) {
            const ind = parsedList.findIndex((val) => val.id.toString() === id);
            console.log(parsedList[ind])
            parsedList[ind].completed = completionStatus;
            localStorage.setItem('all_todos', JSON.stringify(parsedList))
        }
    }
    renderTodos(filter)
}

const submitForm = (filter) => {
    saveTodo(filter);
    renderTodos(filter);
}