import React from 'react'
import { cx, css } from 'emotion'

const pageHeaderDiv = css`
  width: 100%;
  height: 100px;
  font-family: 'Source Sans Pro', 'Helvetica Neue', 'sans-serif', Helvetica, Arial;
  color: #ffffff;
  background-color: #000067;
  padding-left: 1em;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`
const headerDiv = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

function PageHeader() {
  return (
    <div className={cx(pageHeaderDiv)}>
      <div className={cx(headerDiv)}>
        <h1>Class Diagram Generation</h1>
      </div>
    </div>
  )
}

export default PageHeader
