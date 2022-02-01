


//<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.2/redux.min.js"></script>
function generateId() {
    return Math.random();
}
/**
 * custom redux store
 * @param {*} reducer 
 * @returns 
 * {
        getState,   get the current state
        subscribe,  to subscribe the  stoe and listen to any change in the state
        dispatch    for updating the state and returned updated state
    }
 */

function createStore(reducer) {
    // internal state
    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

const ADDTODO = 'ADDTODO'
const REMOVETODO = 'REMOVETODO'
const TOGGLETODO = 'TOGGLETODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'


function addTodoAction(todo) {
    return {
        type: ADDTODO,
        todo
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVETODO,
        id
    }
}

function toglleTodoAction(id) {
    return {
        type: TOGGLETODO,
        id
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

// the reducer 
function todos(state = [], action) {
    switch (action.type) {
        case ADDTODO:
            return state.concat([action.todo])
        case REMOVETODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLETODO:
            return state.map((todo) => todo.id !== action.id ? todo : Object.assign({}, todo, { completed: !todo.completed }))
        default:
            return state;
    }
}

function goals(state = [], action) {
    switch (action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}


function rootReducer(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}
// ex :

const store = createStore(rootReducer);

store.subscribe(() => {
    document.getElementById('todos').innerHTML = '';
    document.getElementById('goals').innerHTML = '';


    console.log(store.getState())
    const { goals, todos } = store.getState()

    goals.forEach(addGoalNodeToDom)
    todos.forEach(addTodoNodeToDom)
})

// store.dispatch(addTodoAction({
//     id: 1,
//     name: "Learn redux",
//     completed: false
// }))

// store.dispatch(addTodoAction({
//     id: 2,
//     name: "Learn c#",
//     completed: false
// }))
// store.dispatch(addTodoAction({
//     id: 3,
//     name: "Learn React Native",
//     completed: false
// }))
// store.dispatch(toglleTodoAction(1))
// store.dispatch(removeTodoAction(2))

// store.dispatch(addGoalAction({
//     id: 3,
//     name: "Great",
// }))

// store.dispatch(addGoalAction({
//     id: 3,
//     name: "Exelent",
// }))

function addTodoNodeToDom(todo) {
    const todoNode = document.createElement('li');
    const nodeText = document.createTextNode(todo.name)
    todoNode.appendChild(nodeText)

    document.getElementById('todos').appendChild(todoNode)
}

function addGoalNodeToDom(goal) {
    const goalNode = document.createElement('li');
    const nodeText = document.createTextNode(goal.name)
    goalNode.appendChild(nodeText)

    document.getElementById('goals').appendChild(goalNode)
}

function addTodo() {
    const todoInput = document.getElementById('todo');
    const name = todoInput.value
    todoInput.value = ''

    store.dispatch(addTodoAction({
        name: name,
        completed: false,
        id: generateId()
    }))
}

function addGoal() {
    const goalInput = document.getElementById('goal');
    const name = goalInput.value
    goalInput.value = ''

    store.dispatch(addGoalAction({
        name: name,
        id: generateId()
    }))
}

document.getElementById('btnAddTodo')
    .addEventListener('click', addTodo)

document.getElementById('btnAddGoal')
    .addEventListener('click', addGoal)

