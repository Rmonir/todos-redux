import { createStore, applyMiddleware } from 'redux'
import RootReducer from '../reducers/appReducer'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunkMiddleware from 'redux-thunk'

const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  applyMiddleware(thunkMiddleware)
  // other store enhancers if any
)
//const composeEnhancers = compose(sayHiOnDispatch, includeMeaningOfLife)
const store = createStore(RootReducer, composedEnhancer)

export default store
