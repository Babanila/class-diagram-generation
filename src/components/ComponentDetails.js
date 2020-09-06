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
  padding: 10px;
  border: 1px solid black;
  overflow-y: scroll;
  overflow-x: hidden;
`

function ComponentDetails({ id, singleData, onClick }) {
  const [allClasses, setAllClasses] = React.useState([])
  const [allRelationships, setAllRelationships] = React.useState([])
  const [allAttributes, setAllAttributes] = React.useState([])

  React.useEffect(() => {
    showAllDetails(singleData)
  }, [id, singleData])

  const showAllDetails = (incomingData) => {
    const { actors, classes, relationships, attributes } = incomingData
    if (actors.acexAllClasses.length > 0) {
      setAllClasses((oldState) => oldState.concat(actors.acexAllClasses))
    }

    if (actors.acexInheritanceRelationship.length > 0) {
      setAllRelationships((state) => [...state, ...actors.acexInheritanceRelationship])
    }

    if (classes.length > 0) setAllClasses((oldClass) => oldClass.concat(classes))

    if (attributes.length > 0) setAllAttributes((oldClass) => oldClass.concat(attributes))

    if (relationships.allRelationships.length > 0) {
      setAllRelationships((state) => [...state, ...relationships.allRelationships])
    }
  }

  return (
    <div className={cx(tableRowDiv)} onClick={() => onClick(id)}>
      <div className={cx(tableCellDiv)}>{id + 1}</div>
      <div className={cx(tableCellDiv)}>{displayArrayValues(filterArrayByType(allClasses, 'type', 'class'))}</div>
      <div className={cx(tableCellDiv)}>{displayArrayValues(filterArrayByType(allAttributes))}</div>
      <div className={cx(tableCellDiv)}>
        {displayArrayValues(filterArrayByType(allRelationships, 'type', 'association'))}
      </div>
      <div className={cx(tableCellDiv)}>
        {displayArrayValues(filterArrayByType(allRelationships, 'type', 'composition'))}
      </div>
      <div className={cx(tableCellDiv)}>
        {displayArrayValues(filterArrayByType(allRelationships, 'type', 'aggregation'))}
      </div>
      <div className={cx(tableCellDiv)}>
        {displayArrayValues(filterArrayByType(allRelationships, 'type', 'inheritance'))}
      </div>
    </div>
  )
}

export default ComponentDetails
