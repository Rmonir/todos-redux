import {
  ADD_TODO,
  TOGGLE_TODO,
  SELECT_COLOR,
  DELETE_TODO,
  COMPLETE_ALL,
  CLEAR_ALL,
  CHANGE_FILTER_STATUS,
  CHANGE_COLOR_FILTER,
} from '../actions/actions-types'
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
      state = {
        ...state,
        todos: [
          ...state.todos
            .filter((todo) => todo.id === action.payload)
            .map((todo) => (todo.completed = !todo.completed)),
        ],
      }
      break

    case SELECT_COLOR:
      state = {
        ...state,
        todos: [
          ...state.todos
            .filter((todo) => todo.id === action.payload)
            .map((todo) => (todo.color = action.payload.color)),
        ],
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
        todos: [...state.todos.map((todo) => (todo.completed = true))],
      }
      break

    case CLEAR_ALL:
      state = {
        ...state,
        todos: [],
      }
      break

    case CHANGE_FILTER_STATUS:
      state = {
        ...state,
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
