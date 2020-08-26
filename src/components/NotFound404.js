import React from 'react'
import { cx, css } from 'emotion'

function NotFound404({ message }) {
  const errorStyle = css`
    width: 100%;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f54b3a;
    margin-top: 10em;
  `

  return (
    <div className={cx(errorStyle)}>
      <h3>{!message ? 'Page not found!!!' : message}</h3>
    </div>
  )
}

export default NotFound404
