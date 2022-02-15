import React from 'react'
import TimesSolid from './time-solid'
import { availableColors, capitalize } from '../filters/colors'
import { useDispatch, useSelector } from 'react-redux'
import actionsFactory from '../../actions/actions'
import {
  DELETE_TODO,
  SELECT_COLOR,
  TOGGLE_TODO,
} from '../../actions/actions-types'
export const TodoListItem = ({ todoId }) => {
  const todo = useSelector((state) => {
    return state.todos.find((todo) => todo.id === todoId)
  })
  const { text, completed, color } = todo
  const dispatch = useDispatch()
  const onDelete = () => {
    dispatch(actionsFactory(DELETE_TODO)(todoId))
  }
  const handleCompletedChanged = () => {
    dispatch(actionsFactory(TOGGLE_TODO)(todoId))
  }
  const handleColorChanged = (e) => {
    dispatch(
      actionsFactory(SELECT_COLOR)({ id: todoId, color: e.target.value })
    )
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))
  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
