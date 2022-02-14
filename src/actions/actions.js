import {
  ADD_TODO,
  TOGGLE_TODO,
  SELECT_COLOR,
  DELETE_TODO,
  COMPLETE_ALL,
  CHANGE_FILTER_STATUS,
  CHANGE_COLOR_FILTER,
  CLEAR_COMPLETED,
} from './actions-types'

const actionsFactory = (action) => {
  switch (action) {
    case ADD_TODO:
      return (payload) => {
        return { type: 'todos/todoAdded', payload: payload }
      }
    case TOGGLE_TODO:
      return (payload) => {
        return { type: 'todos/todoToggled', payload: payload }
      }
    case SELECT_COLOR:
      return (payload) => {
        return { type: 'todos/colorSelected', payload: payload }
      }
    case DELETE_TODO:
      return (payload) => {
        return { type: 'todos/todoDeleted', payload: payload }
      }
    case COMPLETE_ALL:
      return { type: 'todos/allCompleted' }
    case CLEAR_COMPLETED:
      return { type: 'todos/completedCleared' }
    case CHANGE_FILTER_STATUS:
      return (payload) => {
        return { type: 'filters/statusFilterChanged', payload: payload }
      }
    case CHANGE_COLOR_FILTER:
      return (payload) => {
        return {
          type: 'filters/colorFilterChanged',
          payload: payload,
        }
      }
    default:
      break
  }
}

export default actionsFactory
