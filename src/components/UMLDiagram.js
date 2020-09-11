import React from 'react'
import { useHistory } from 'react-router-dom'
import { css, cx } from 'emotion'
import SingleButton from './SingleButton'
import DiagramGenerator from './DiagramGenerator'
import DiagramGeneratorSyncFusion from './DiagramGeneratorSyncFusion'
import { UserInputData } from '../utils/helpers'

const umlDiagDiv = css`
  margin-top: 100px;
  width: 100%;
  height: 689px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: transparent;
`

const diagDiv = css`
  height: 90%;
  width: 80%;
  display: flex;
  background-color: transparent;
`

const umlDiagHeaderDiv = css`
  width: 80%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3em;
`

const umlDiagHeaderTitleDiv = css`
  display: table-caption;
  font-size: 26px;
  font-weight: bold;
  padding-top: 10px;
`

const btnDiv = css`
  width: 210px;
  display: flex;
  justify-content: space-between;
`

const backBtnStyle = css`
  width: 100px;
  padding: 10px;
  font-size: 1em;
  border: 2px solid #000000;
  border-radius: 5px;
  outline: none;
  color: #ffffff;
  background-color: #000000;
  &:hover {
    cursor: pointer;
    color: #000000;
    background-color: #ffffff;
  }
`

const existBtnStyle = css`
  width: 100px;
  padding: 10px;
  font-size: 1em;
  border: 2px solid #ff0000;
  border-radius: 5px;
  outline: none;
  color: #ffffff;
  background-color: #ff0000;
  &:hover {
    cursor: pointer;
    color: #ff0000;
    background-color: #ffffff;
  }
`

function UMLDiagram() {
  const { state } = React.useContext(UserInputData)
  const history = useHistory()

  const handleGoBack = () => history.push('/')
  const handleUMLComponent = () => history.push('/uml-components')

  return (
    <div className={cx(umlDiagDiv)}>
      <div className={cx(umlDiagHeaderDiv)}>
        <div className={cx(umlDiagHeaderTitleDiv)}>UMLDiagram</div>
        <div className={cx(btnDiv)}>
          <SingleButton btnName="Back" btnClick={handleUMLComponent} btnStyles={backBtnStyle} />
          <SingleButton btnName="Exit" btnClick={handleGoBack} btnStyles={existBtnStyle} />
        </div>
      </div>
      <div className={cx(diagDiv)}>
        <DiagramGeneratorSyncFusion umlData={state} />
      </div>
    </div>
  )
}

export default UMLDiagram
