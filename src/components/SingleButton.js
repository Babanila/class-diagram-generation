import React from 'react'
import { cx } from 'emotion'

function SingleButton({ btnName, btnClick, btnStyles }) {
  return (
    <button className={cx(btnStyles)} onClick={(e) => btnClick(e)}>
      {btnName}
    </button>
  )
}

export default SingleButton
