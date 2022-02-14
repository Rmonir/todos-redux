import {
  ADD_TODO,
  TOGGLE_TODO,
  SELECT_COLOR,
  DELETE_TODO,
  COMPLETE_ALL,
  CHANGE_FILTER_STATUS,
  CHANGE_COLOR_FILTER,
  CLEAR_COMPLETED,
} from '../actions/actions-types'
import StatusFilters from '../components/filters/statusFilters'
const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
  ],
  filters: {
    status: 'All',
    colors: [''],
  },
}

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}
const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      state = {
        ...state,
        todos: [
          ...state.todos,
          {
            id: nextTodoId([...state.todos]),
            completed: false,
            text: action.payload,
          },
        ],
      }
      break
    case TOGGLE_TODO:
      let index = state.todos.findIndex((todo) => todo.id === action.payload)
      state.todos[index].completed = !state.todos[index].completed
      state = {
        ...state,
        todos: [...state.todos],
      }
      break

    case SELECT_COLOR:
      let selectedIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      )
      state.todos[selectedIndex].color = action.payload.color
      state = {
        ...state,
        todos: [...state.todos],
      }

      break

    case DELETE_TODO:
      state = {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== action.payload)],
      }
      break

    case COMPLETE_ALL:
      state = {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            todo.completed = true
            return todo
          }),
        ],
      }
      break

    case CLEAR_COMPLETED:
      state = {
        ...state,
        todos: [...state.todos.filter((todo) => todo.completed === false)],
      }
      break

    case CHANGE_FILTER_STATUS:
      let filterdTodos = state.todos
      switch (action.payload) {
        case StatusFilters.Active:
          filterdTodos = state.todos.filter((todo) => todo.completed === false)
          break
        case StatusFilters.Completed:
          filterdTodos = state.todos.filter((todo) => todo.completed === true)
          break
        default:
          break
      }

      state = {
        ...state,
        todos: [...filterdTodos],
        filters: {
          status: action.payload,
        },
      }
      break

    case CHANGE_COLOR_FILTER:
      // state = {
      //   ...state,
      //   filters: {
      //     colors: [...state.filters.colors, action.payload.color],
      //   },
      // }
      break

    default:
      break
  }
  return state
}

export default RootReducer
