import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { cx, css } from 'emotion'
import PageHeader from './PageHeader'
import IntroPage from './IntroPage'
import UMLComponent from './UMLComponent'
import UMLDiagram from './UMLDiagram'
import NotFound404 from './NotFound404'
import { initialState, UserInputData } from '../utils/helpers'
import { reducer } from '../utils/reducers'

const rootDiv = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <UserInputData.Provider value={{ state, dispatch }}>
      <BrowserRouter className={cx(rootDiv)}>
        <PageHeader />
        <Switch>
          <Route exact path="/" render={(props) => <IntroPage {...props} />} />
          <Route path="/uml-components" render={(props) => <UMLComponent {...props} />} />
          <Route path="/uml-diagram" render={(props) => <UMLDiagram {...props} />} />
          <Route component={NotFound404} />
        </Switch>
      </BrowserRouter>
    </UserInputData.Provider>
  )
}

export default App
