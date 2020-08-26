import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { cx, css } from 'emotion'
import PageHeader from './PageHeader'
import IntroPage from './IntroPage'
import NotFound404 from './NotFound404'

const rootDiv = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <div className={cx(rootDiv)}>
      <PageHeader />
      <Switch>
        <Route exact path="/" render={(props) => <IntroPage {...props} />} />
        <Route component={NotFound404} />
      </Switch>
    </div>
  )
}

export default App
