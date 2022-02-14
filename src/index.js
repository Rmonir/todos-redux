import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './api/server'
import store from './store/store'
import { Provider } from 'react-redux'

// import actionsFactory from './actions/actions'
// import {
//   ADD_TODO,
//   TOGGLE_TODO,
//   CHANGE_FILTER_STATUS,
//   CHANGE_COLOR_FILTER,
// } from './actions/actions-types'

// // Log the initial state
// console.log('Initial state: ', store.getState())
// // {todos: [....], filters: {status, colors}}

// // Every time the state changes, log it
// // Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() =>
//   console.log('State after dispatch: ', store.getState())
// )

// // Now, dispatch some actions

// store.dispatch(actionsFactory(ADD_TODO)('Learn about actions'))
// store.dispatch(actionsFactory(ADD_TODO)('Learn about reducers'))
// store.dispatch(actionsFactory(ADD_TODO)('Learn about stores'))

// store.dispatch(actionsFactory(TOGGLE_TODO)(0))
// store.dispatch(actionsFactory(TOGGLE_TODO)(1))

// store.dispatch(actionsFactory(CHANGE_FILTER_STATUS)('Active'))

// store.dispatch(
//   actionsFactory(CHANGE_COLOR_FILTER)({ color: 'red', changeType: 'added' })
// )

// // Stop listening to state updates
// unsubscribe()

// // Dispatch one more action to see what happens

// store.dispatch(actionsFactory(ADD_TODO)('Try creating a store'))

// // Omit existing React rendering logic

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
