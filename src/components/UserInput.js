import React from 'react'
import { cx } from 'emotion'

function UserInput({ value, userInputClick, userInputStyles }) {
  return (
    <textarea
      className={cx(userInputStyles)}
      placeholder="Enter the text here..."
      onChange={(e) => userInputClick(e)}
      value={value}
    />
  )
}

export default UserInput
