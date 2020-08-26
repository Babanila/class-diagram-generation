import React from 'react'
import { cx } from 'emotion'

function UserInput({ userInputClick, userInputStyles }) {
  return (
    <textarea
      className={cx(userInputStyles)}
      placeholder="Enter the text here..."
      onChange={(e) => userInputClick(e)}
    />
  )
}

export default UserInput
