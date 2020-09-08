import * as React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import {
  filterArrayByType,
  removeDuplicate,
  flattenWithNoDuplicateArray,
  relationshipConnectionArray,
  appearancePercentage
} from '../utils/helpers'

function DiagramGenerator({ umlData }) {
  //  This function is responsible for setting up the diagram's initial properties and any templates.
  const initDiagram = () => {
    const $ = go.GraphObject.make
    const diagram = $(go.Diagram, {
      // Diagram movement setting
      'undoManager.isEnabled': true,
      'undoManager.maxHistoryLength': 0,
      isReadOnly: false,
      allowHorizontalScroll: true,
      allowVerticalScroll: true,
      allowSelect: true,
      contentAlignment: go.Spot.LeftCenter,

      // Layout Settings
      layout: $(
        go.LayeredDigraphLayout, // this will be discussed in a later section
        { columnSpacing: 5, setsPortSpots: false }
      ),

      // Link Settings
      linkTemplate: $(go.Link, new go.Binding('routing', 'routing'), $(go.Shape)),

      // Model settings
      model: $(go.GraphLinksModel, {
        linkKeyProperty: 'token', // This should always be set for merges and data sync when using GraphLinksModel
        nodeKeyProperty: 'token'
      })
    })

    // Node Template Settings
    diagram.nodeTemplate = $(
      go.Node,
      'Auto',
      {
        fromSpot: go.Spot.Right, // coming out from middle-right
        toSpot: go.Spot.Left // going into at middle-left
      },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(
        go.Shape,
        'Rectangle',
        { name: 'SHAPE', fill: 'white', stroke: 'black', strokeWidth: 2 },
        new go.Binding(('fill', 'white')).makeTwoWay() // Shape.fill is bound to Node.data.color
      ),

      $(
        go.Panel,
        'Table',
        // Row 1:
        $(
          go.TextBlock,
          'alignment: Center',
          {
            row: 0,
            column: 0,
            columnSpan: 4,
            margin: 5,
            font: 'bold 15pt sans-serif'
          },
          new go.Binding('text', 'token').makeTwoWay() // Setting the classname
        ),

        // Horizontal line after row 1:
        $(go.RowColumnDefinition, {
          row: 1,
          column: 0,
          separatorStrokeWidth: 1.5,
          separatorStroke: 'black'
        }),

        // Row 2:
        $(go.TextBlock, '', {
          row: 1,
          column: 0,
          margin: 8
        }),

        // Horizontal line after row 2:
        $(go.RowColumnDefinition, {
          row: 2,
          column: 0,
          separatorStrokeWidth: 1.5,
          separatorStroke: 'black'
        }),

        // Row 3:
        $(go.TextBlock, '', {
          row: 2,
          column: 0,
          margin: 8
        })
      )
    )

    return diagram
  }

  const diagramRef = React.createRef()
  const realClasses = flattenWithNoDuplicateArray(umlData.classes, removeDuplicate, filterArrayByType)
  const relationshipConnection = relationshipConnectionArray(umlData)
  
  const filteredRealClass = realClasses.reduce((acc, cls) => {
    const { count,totalLength,percentApp } = appearancePercentage(umlData.userInput, cls.token)
    return count > 1 ? acc.concat(cls) : acc
  }, [])
    
  const nodeDataArray = [...filteredRealClass]
  const linkDataArray = [].concat(...relationshipConnection)
  const handleModelChange = () => {}

  return (
    <ReactDiagram
      ref={diagramRef}
      divClassName="diagram-component"
      initDiagram={initDiagram}
      nodeDataArray={nodeDataArray}
      linkDataArray={linkDataArray}
      onModelChange={handleModelChange}
    />
  )
}

export default DiagramGenerator
