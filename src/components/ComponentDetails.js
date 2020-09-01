import React from 'react'
import { cx, css } from 'emotion'
import { filterArrayByType, displayArrayValues } from '../utils/helpers'

const tableRowDiv = css`
  display: table-row;
  background-color: #f6f6f6;
  &:hover {
    background-color: #e8f4f8;
  }
`

const tableCellDiv = css`
  display: table-cell;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid black;
`

function ComponentDetails({ id, singleData, onClick }) {
  const [allClasses, setAllClasses] = React.useState([])
  const [compoundNoun, setCompoundNoun] = React.useState([])
  const [relationships, setRelationships] = React.useState([])

  React.useEffect(() => {
    showAllDetails(singleData)
  }, [id, singleData])

  const showAllDetails = (incomingData) => {
    const { acexClass, clexClass, relpexVerb } = incomingData
    if (acexClass.acexAllClasses.length > 0) {
      setAllClasses((oldState) => oldState.concat(acexClass.acexAllClasses))
    }

    if (acexClass.acexCompoundNoun.length > 0) setCompoundNoun(acexClass.acexCompoundNoun)

    if (acexClass.acexInheritanceRelationship.length > 0) {
      setRelationships((state) => [...state, ...acexClass.acexInheritanceRelationship])
    }

    if (clexClass.length > 0) setAllClasses((oldClass) => oldClass.concat(clexClass))

    if (relpexVerb.allRelationships.length > 0) {
      setRelationships((state) => [...state, ...relpexVerb.allRelationships])
    }
  }

  return (
    <div className={cx(tableRowDiv)} onClick={() => onClick(id)}>
      <div className={cx(tableCellDiv)}>{id + 1}</div>
      <div className={cx(tableCellDiv)}>
        {displayArrayValues(filterArrayByType(allClasses, 'class'))}
      </div>
      <div className={cx(tableCellDiv)}>
        {displayArrayValues(filterArrayByType(relationships, 'association'))}
      </div>
      <div className={cx(tableCellDiv)}>
        {displayArrayValues(filterArrayByType(relationships, 'composition'))}
      </div>
      <div className={cx(tableCellDiv)}>
        {displayArrayValues(filterArrayByType(relationships, 'aggregation'))}
      </div>
      <div className={cx(tableCellDiv)}>
        {displayArrayValues(filterArrayByType(relationships, 'inheritance'))}
      </div>
    </div>
  )
}

export default ComponentDetails
