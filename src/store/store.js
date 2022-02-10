import { createStore } from 'redux'
import RootReducer from '../reducers/appReducer'

let preloadedState
const persistedTodosString = localStorage.getItem('todos')

if (persistedTodosString) {
  preloadedState = {
    todos: JSON.parse(persistedTodosString),
  }
}

const store = createStore(RootReducer, preloadedState)
export default store
