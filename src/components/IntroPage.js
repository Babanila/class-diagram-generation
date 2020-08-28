import React from 'react'
import { useHistory } from 'react-router-dom'
import { css, cx } from 'emotion'
import UserInput from './UserInput'
import SingleButton from './SingleButton'
import { UserInputData } from '../utils/helpers'

const introPageDiv = css`
  margin-top: 100px;
  width: 100%;
  height: 689px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: transparent;
`
const introPageInnerDiv = css`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
`

const userInputStyles = css`
  width: 100%;
  min-width: 350px;
  height: 150px;
`

const processBtnStyle = css`
  width: 100px;
  padding: 10px;
  font-size: 1em;
  border: 2px solid #009900;
  border-radius: 5px;
  outline: none;
  color: #ffffff;
  background-color: #009900;
  &:hover {
    cursor: pointer;
    color: #009900;
    background-color: #ffffff;
  }
`

function IntroPage() {
  const { state, dispatch } = React.useContext(UserInputData)
  const [inputText, setInputText] = React.useState(state.userInput)
  const history = useHistory()

  const handleUserInput = ({ target }) => setInputText(target.value)

  const handleDataProcess = () => {
    dispatch({ type: 'UPDATE_INPUT', payload: inputText })
    history.push('/uml-components')
  }

  return (
    <div className={cx(introPageDiv)}>
      <div className={cx(introPageInnerDiv)}>
        <UserInput
          userInputClick={handleUserInput}
          userInputStyles={userInputStyles}
          value={inputText}
        />
        <SingleButton btnName="Process" btnClick={handleDataProcess} btnStyles={processBtnStyle} />
      </div>
    </div>
  )
}

export default IntroPage
