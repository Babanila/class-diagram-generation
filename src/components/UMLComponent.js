import React from 'react'
import { useHistory } from 'react-router-dom'
import { css, cx } from 'emotion'
import {
  removeDuplicate,
  UserInputData,
  breakSentences,
  tokenizerSentence,
  posTagSentence
} from '../utils/helpers'
import { acexRule, clexRule, relpexRule, classExtraction } from '../utils/parsers'
import SingleButton from './SingleButton'
import ComponentDetails from './ComponentDetails'

const umlCompDiv = css`
  margin-top: 50px;
  width: 100%;
  height: 689px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: transparent;
`
const ptyHeaderDiv = css`
  height: 30px;
  width: 80%;
  max-width: 1200px;
  display: table;
  border: 1px solid black;
  background-color: transparent;
`

const tableTopHeaderDiv = css`
  display: table-cell;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  background-color: #d8d8d8;
  @media (max-width: 420px) {
    font-size: 16px;
  }
`

const ptyCompDiv = css`
  height: 60%;
  width: 80%;
  max-width: 1200px;
  display: table;
  margin-top: 1em;
  margin-bottom: 1em;
  background-color: yellow;
`

const tableTitleHeaderDiv = css`
  width: 80%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3em;
`

const tableTitleDiv = css`
  display: table-caption;
  font-size: 26px;
  font-weight: bold;
  padding-top: 10px;
`

const tableHeaderDiv = css`
  display: table-cell;
  height: 30px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid black;
  background-color: #f6f6f6;
  @media (max-width: 420px) {
    font-size: 16px;
  }
`

const tableBodyDiv = css`
  display: table-row-group;
`

const tableNullBody = css`
  display: table-caption;
  font-size: 20px;
  color: #f54b3a;
`

const btnDiv = css`
  width: 260px;
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

const diagramBtnStyle = css`
  width: 150px;
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

function UMLComponent() {
  const { state, dispatch } = React.useContext(UserInputData)
  const [allData, setAllData] = React.useState([])

  const history = useHistory()
  const str = state.userInput

  React.useEffect(() => {
    getClassAndReplAndAss(str)
  }, [str])

  const getIndividualDetails = async (parseString) => {
    const splitedString = await breakSentences(parseString, '.')
    return splitedString.map((element) => posTagSentence(tokenizerSentence(element)).taggedWords)
  }

  const getClassAndReplAndAss = async (inpStr) => {
    const splitedString = await getIndividualDetails(inpStr)
    await splitedString.map((element) => {
      const responseData = classExtraction(element, acexRule, clexRule, relpexRule, removeDuplicate)
      setAllData((allData) => allData.concat(responseData))
      dispatch({
        type: 'UPDATE_CLASSES',
        payload: [...responseData.acexClass.acexAllClasses, ...responseData.clexClass]
      })
      dispatch({
        type: 'UPDATE_RELATIONSHIPS',
        payload: [...responseData.relpexVerb.allRelationships]
      })
      dispatch({
        type: 'UPDATE_COMPOUNDNOUN',
        payload: [...responseData.acexClass.acexCompoundNoun]
      })
    })
  }

  const handleGoBack = () => history.push('/')
  const handleDiagramGeneration = async () => history.push('/uml-diagram')

  const showClassDetails = async (id) => {
    const breakedString = await breakSentences(str, '.')
    alert(breakedString[id])
  }

  return (
    <div className={cx(umlCompDiv)}>
      <div className={cx(tableTitleHeaderDiv)}>
        <div className={cx(tableTitleDiv)}>Sentence List</div>
        <div className={cx(btnDiv)}>
          <SingleButton btnName="Back" btnClick={handleGoBack} btnStyles={backBtnStyle} />
          <SingleButton
            btnName="View Diagram"
            btnClick={handleDiagramGeneration}
            btnStyles={diagramBtnStyle}
          />
        </div>
      </div>
      <div className={cx(ptyHeaderDiv)}>
        <div className={cx(tableTopHeaderDiv)}>Components</div>
        <div className={cx(tableTopHeaderDiv)}>Relationships</div>
      </div>
      <div className={cx(ptyCompDiv)}>
        <div className={cx(tableHeaderDiv)}>No</div>
        <div className={cx(tableHeaderDiv)}>Classes</div>
        <div className={cx(tableHeaderDiv)}>Associations</div>
        <div className={cx(tableHeaderDiv)}>Compostion</div>
        <div className={cx(tableHeaderDiv)}>Aggregation</div>
        <div className={cx(tableHeaderDiv)}>Inheritance</div>
        {allData.length === 0 ? (
          <div className={cx(tableNullBody)}> No Input Data</div>
        ) : (
          <div className={cx(tableBodyDiv)}>
            {allData.map((item, i) => (
              <ComponentDetails key={i} id={i} singleData={item} onClick={showClassDetails} />
            ))}
          </div>
        )}
      </div>
      {/* <div className={cx(btnDiv)}>
        <SingleButton btnName="Back" btnClick={handleGoBack} btnStyles={backBtnStyle} />
        <SingleButton
          btnName="View Diagram"
          btnClick={handleDiagramGeneration}
          btnStyles={diagramBtnStyle}
        />
      </div> */}
    </div>
  )
}

export default UMLComponent
