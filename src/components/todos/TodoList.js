import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import actionsFactory from '../../actions/actions'
import {
  CHANGE_COLOR_FILTER,
  DELETE_TODO,
  SELECT_COLOR,
  TOGGLE_TODO,
} from '../../actions/actions-types'
import TodoListItem from './TodoListItem'

export const TodoList = () => {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const onColorChange = (payload) => {
    dispatch(actionsFactory(SELECT_COLOR)(payload))
  }

  const onCompletedChange = (id) => {
    dispatch(actionsFactory(TOGGLE_TODO)(id))
  }

  const onDelete = (id) => {
    dispatch(actionsFactory(DELETE_TODO)(id))
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          onColorChange={(color) => {
            onColorChange({ id: todo.id, color: color })
          }}
          onCompletedChange={() => {
            onCompletedChange(todo.id)
          }}
          onDelete={() => {
            onDelete(todo.id)
          }}
          todo={todo}
        />
      ))}
    </ul>
  )
}

export default TodoList
