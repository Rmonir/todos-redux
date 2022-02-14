import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actionsFactory from '../../actions/actions'
import {
  CHANGE_COLOR_FILTER,
  CHANGE_FILTER_STATUS,
  CLEAR_COMPLETED,
  COMPLETE_ALL,
} from '../../actions/actions-types'
import { availableColors, capitalize } from '../filters/colors'
import StatusFilters from '../filters/statusFilters'

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color)
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(color, changeType)
    }

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {capitalize(color)}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}

const Footer = () => {
  const { todos, filters } = useSelector((state) => state)
  const { status } = filters
  const colors = []
  const todosRemaining = todos.filter((todo) => todo.completed === false).length

  const dispatch = useDispatch()

  const onMarkAllCompleted = () => {
    dispatch(actionsFactory(COMPLETE_ALL))
  }
  const onClearCompleted = () => {
    dispatch(actionsFactory(CLEAR_COMPLETED))
  }
  const onColorChange = (color, changeType) => {
    dispatch(actionsFactory(CHANGE_COLOR_FILTER)({ color, changeType }))
  }

  const onStatusChange = (status) => {
    dispatch(actionsFactory(CHANGE_FILTER_STATUS)(status))
  }

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={onMarkAllCompleted}>
          Mark All Completed
        </button>
        <button className="button" onClick={onClearCompleted}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter
        value={status}
        onChange={(e) => {
          onStatusChange(e)
        }}
      />
      <ColorFilters
        value={colors}
        onChange={(color, changeType) => {
          onColorChange(color, changeType)
        }}
      />
    </footer>
  )
}
export default Footer
