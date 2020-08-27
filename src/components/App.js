import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { cx, css } from 'emotion'
import PageHeader from './PageHeader'
import IntroPage from './IntroPage'
import UMLComponent from './UMLComponent'
import UMLDiagram from './UMLDiagram'
import NotFound404 from './NotFound404'

const rootDiv = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <BrowserRouter className={cx(rootDiv)}>
      <PageHeader />
      <Switch>
        <Route exact path="/" render={(props) => <IntroPage {...props} />} />
        <Route path="/uml-components" render={(props) => <UMLComponent {...props} />} />
        <Route path="/uml-diagram" render={(props) => <UMLDiagram {...props} />} />
        <Route component={NotFound404} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
