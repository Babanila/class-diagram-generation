import * as React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import {
  filterArrayByType,
  removeDuplicate,
  flattenWithNoDuplicateArray,
  relationshipConnectionArray
} from '../utils/helpers'

function DiagramGenerator({ umlData }) {
  //  This function is responsible for setting up the diagram's initial properties and any templates.
  const initDiagram = () => {
    const $ = go.GraphObject.make
    const diagram = $(go.Diagram, {
      initialContentAlignment: go.Spot.LeftCenter,
      'undoManager.isEnabled': true,
      'undoManager.maxHistoryLength': 0,
      'clickCreatingTool.archetypeNodeData': { name: 'new UML', color: 'lightblue' },

      // Layout setting
      layout: $(go.TreeLayout, {
        angle: 0,
        arrangement: go.TreeLayout.ArrangementVertical,
        treeStyle: go.TreeLayout.StyleLayered
      }),

      // Diagram movement setting
      isReadOnly: false,
      allowHorizontalScroll: true,
      allowVerticalScroll: true,
      allowSelect: true,
      contentAlignment: go.Spot.LeftCenter,

      // Model setting
      model: $(go.GraphLinksModel, {
        linkKeyProperty: 'key' // This should always be set for merges and data sync when using GraphLinksModel
      })
    })

    // Node template
    diagram.nodeTemplate = $(
      go.Node,
      'Auto',
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
          new go.Binding('text', 'key').makeTwoWay() // Setting the classname
        ),

        // Horizontal line before row 1:
        $(go.RowColumnDefinition, {
          row: 1,
          column: 0,
          separatorStrokeWidth: 1.5,
          separatorStroke: 'black'
        }),

        // Horizontal line before row 2:
        $(go.RowColumnDefinition, {
          row: 2,
          column: 0,
          separatorStrokeWidth: 1.5,
          separatorStroke: 'black'
        }),

        $(go.TextBlock, 'attributes', {
          row: 1,
          column: 0,
          margin: 8
        }),
        $(
          go.TextBlock,
          { row: 1, column: 1, margin: 5, editable: true },
          new go.Binding('text', 'attributes').makeTwoWay() // Setting the attributes
        ),

        $(go.TextBlock, 'operations', {
          row: 2,
          column: 0,
          margin: 8
        }),
        $(
          go.TextBlock,
          { row: 2, column: 1, margin: 5, editable: true },
          new go.Binding('text', 'operations').makeTwoWay()
        ) // Setting the operation
      )
    )

    // Link template
    diagram.linkTemplate = $(go.Link, $(go.Shape))

    return diagram
  }

  const realClasses = flattenWithNoDuplicateArray(umlData.classes, removeDuplicate, filterArrayByType)
  const relationshipConnection = relationshipConnectionArray(umlData.classes)

  const nodeDataArray = [...realClasses]
  const linkDataArray = [].concat(...relationshipConnection)

  console.log('umlData.classes', umlData)
  console.log('realClasses', realClasses)

  const handleModelChange = () => {}
  const diagramRef = React.createRef()

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
