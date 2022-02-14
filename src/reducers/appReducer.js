import { combineReducers } from 'redux'
import FiltersReducer from './filtersReducer'
import TodosReducer from './todosReducer'

const RootReducer = combineReducers({
  todos: TodosReducer,
  filters: FiltersReducer,
})
export default RootReducer
