import actionsFactory from '../actions/actions'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SELECT_COLOR,
  DELETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED,
  LOADTODOS,
} from '../actions/actions-types'
import { client } from '../api/client'

const initialState = []
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
    case LOADTODOS:
      return action.payload
    default:
      return state
  }
}

export async function loadTodos(dispatch, getState) {
  const response = await client.get('/fakeApi/todos')
  dispatch(actionsFactory(LOADTODOS)(response.todos))
}

export const saveNewTodo = (text) => {
  return async (dispatch, getState) => {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    console.log(response)
    dispatch(actionsFactory(ADD_TODO)(response.todo))
  }
}

export default TodosReducer
