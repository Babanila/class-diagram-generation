import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DiagramComponent } from '@syncfusion/ej2-react-diagrams'
import {
  filterArrayByType,
  removeDuplicate,
  flattenWithNoDuplicateArray,
  relationshipConnectionArray,
  addSyncFusionParametersToArray,
  appearancePercentage
} from '../utils/helpers'

function DiagramGeneratorSyncFusion({ umlData }) {
  const realClasses = flattenWithNoDuplicateArray(umlData.classes, removeDuplicate, filterArrayByType)
  const relationshipConnection = relationshipConnectionArray(umlData)

  // const filteredRealClass = realClasses.reduce((acc, cls) => {
  //   const { count, totalLength, percentApp } = appearancePercentage(umlData.userInput, cls.token)
  //   return count > 0 ? acc.concat(cls) : acc
  // }, [])

  const modifiedClasses = addSyncFusionParametersToArray(realClasses)
  const nodes = [...modifiedClasses]
  const connectors = [].concat(...relationshipConnection)

  return (
    <DiagramComponent
      id="diagram"
      width="100%"
      height={"600px"}
      nodes={nodes}
      connectors={connectors}
      // Defines the default properties for the node
      getNodeDefaults={(node) => {
        node.height = 100
        node.width = 100
        node.style.fill = '#e6eeff'
        node.style.strokeColor = '#000000'
        return node
      }}
    />
  )
}

export default DiagramGeneratorSyncFusion
