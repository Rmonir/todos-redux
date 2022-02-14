import {
  ADD_TODO,
  TOGGLE_TODO,
  SELECT_COLOR,
  DELETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED,
} from '../actions/actions-types'
const initialState = [
  { id: 0, text: 'Learn React', completed: true },
  { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
]

// function nextTodoId(todos) {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
//   return maxId + 1
// }
const TodosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload]
    case TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }
        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    case SELECT_COLOR:
      const { color, id } = action.payload
      return state.map((todo) => {
        if (todo.id !== id) {
          return todo
        }
        return {
          ...todo,
          color,
        }
      })
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload)
    case COMPLETE_ALL:
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    case CLEAR_COMPLETED:
      return state.filter((todo) => todo.completed === false)
    default:
      break
  }
  return state
}

export default TodosReducer
