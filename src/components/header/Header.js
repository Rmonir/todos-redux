import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveNewTodo } from '../../reducers/todosReducer'

export const Header = () => {
  const [text, setText] = useState('')
  const handleChange = (e) => setText(e.target.value)

  const dispatch = useDispatch()

  const handleKeyDown = (e) => {
    let trimmedText = e.target.value.trim()
    if (e.key === 'Enter' && trimmedText) {
      dispatch(saveNewTodo(trimmedText))
      setText('')
    }
  }

  return (
    <React.Fragment>
      <header className="header">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </header>
    </React.Fragment>
  )
}

export default Header
