import {
  CHANGE_FILTER_STATUS,
  CHANGE_COLOR_FILTER,
} from '../actions/actions-types'
import StatusFilters from '../components/filters/statusFilters'
const initialState = {
  status: 'All',
  colors: [''],
}

const FiltersReducer = (state = [], action) => {
  switch (action.type) {
    case CHANGE_FILTER_STATUS:

    case CHANGE_COLOR_FILTER:

    default:
      break
  }
  return state
}

export default FiltersReducer
