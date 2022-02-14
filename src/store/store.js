import { createStore, compose, applyMiddleware } from 'redux'
import { print1, print2, print3 } from '../exampleAddons/middleware'
import RootReducer from '../reducers/appReducer'
import { composeWithDevTools } from '@redux-devtools/extension'
// import {
//   sayHiOnDispatch,
//   includeMeaningOfLife,
// } from './exampleAddons/enhancers'

let preloadedState
const persistedTodosString = localStorage.getItem('todos')

if (persistedTodosString) {
  preloadedState = {
    todos: JSON.parse(persistedTodosString),
  }
}
const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  applyMiddleware(print1, print2, print3)
  // other store enhancers if any
)
//const composeEnhancers = compose(sayHiOnDispatch, includeMeaningOfLife)
const store = createStore(RootReducer, composedEnhancer)
export default store
