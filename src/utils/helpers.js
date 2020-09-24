import React from 'react'
const natural = require('natural')
const lemmatize = require('wink-lemmatizer')

export const UserInputData = React.createContext()

export const initialState = {
  userInput: '',
  classes: [],
  attributes: [],
  relationships: [],
  compoundNoun: []
}



export function breakSentences(inputString, inputSymbol) {
  return inputString
    .trim()
    .split(`${inputSymbol}`)
    .filter((item) => item)
}

export function tokenizerSentence(inputString) {
  const tokenizer = new natural.WordTokenizer()
  return tokenizer.tokenize(inputString)
}

export function posTagSentence(inputString, lang = 'EN') {
  const language = lang
  const defaultCategory = 'N'
  const defaultCategoryCapitalized = 'NNP'

  const lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized)
  const ruleSet = new natural.RuleSet(lang)
  const tagger = new natural.BrillPOSTagger(lexicon, ruleSet)
  return tagger.tag(inputString)
}

export function removeDuplicate(arrayOfObject) {
  return arrayOfObject.reduce(
    (acc, element) =>
      acc.find((item) => item.token.toLowerCase() === element.token.toLowerCase() && item.type === element.type)
        ? acc
        : acc.concat(element),
    []
  )
}

export function appearancePercentage(str, word) {
  const count = str
    .trim()
    .split(/[ .]+/)
    .filter((x) => lemmatize.noun(x.toLowerCase()) == lemmatize.noun(word.toLowerCase())).length

  const totalLength = str.length
  const percentApp = count / totalLength
  return { count, totalLength, percentApp }
}

export function filterArrayByType(arr, propertyType, filterByType = '') {
  return filterByType !== '' ? arr.filter((item) => item.token !== '' && item[propertyType] === filterByType) : arr
}

export function displayArrayValues(arr) {
  if (!Array.isArray(arr) || !arr || arr.length === 0) return 'Empty'
  return (
    <ul>
      {arr.map((item, i) => (
        <li key={i + 'x'}>{item.token}</li>
      ))}
    </ul>
  )
}

export function removeGeneralizedWords(arrayOfObject) {
  const commonWords = ['system', 'application', 'detail', 'address']
  return arrayOfObject.reduce((acc, item) => {
    return commonWords.includes(lemmatize.noun(item.token.toLowerCase())) ? acc : acc.concat(item)
  }, [])
}

export function flattenWithNoDuplicateArray(arrayOfArray, duplicateRemoval, filterByType) {
  const arrayWithNoDup = arrayOfArray.map((element) => filterByType(duplicateRemoval(element), 'type', 'class'))
  return [].concat(...arrayWithNoDup)
}

export function addSyncFusionParametersToArray(arrayOfObject) {
  const modifiedArray = arrayOfObject.map((element, i) => {
    return {
      ...element,
      offsetX: ( (i+1) * 50),
      offsetY: ( i%2 === 0 )?  100 : 300,
      annotations: [
        {
          id: element.token,
          content: element.token
        }
      ]
    }
  })
  return [].concat(...modifiedArray)
}

export function uniqueArrayOfObject(arrayOfObject) {
  return arrayOfObject
    .filter((item) => item)
    .reduce(
      (acc, element) =>
        acc.find(
          (item) =>
            item.sourceID.toLowerCase() === element.sourceID.toLowerCase() &&
            item.targetID.toLowerCase() === element.targetID.toLowerCase()
        )
          ? acc
          : acc.concat(element),
      []
    )
}

export function relationshipConnectionArray(arrayOfArray) {
  const { classes, relationships } = arrayOfArray
  const arrayWithNoDup = []

  classes.map((elements, i) => {
    const relationConnection = relationships[i]
    const subjectClass = elements.filter((item) => item.position === 'cl-subject')
    const objectClass = elements.filter((item) => item.position === 'cl-object')

    if (subjectClass.length > 0 && objectClass.length > 0) {
      subjectClass.map((subjItem) => {
        objectClass.map((objItem, j) => {
          if (relationConnection[j]?.type === 'association') {
            arrayWithNoDup.push({
              id: `${subjItem.token}+${objItem.token}+${j}`,
              sourceID: subjItem.token,
              targetID: objItem.token,
              type: 'Straight',
              shape: {
                type: 'UmlClassifier',
                relationship: 'Association'
              }
            })
          }

          if (relationConnection[j]?.type === 'composition') {
            arrayWithNoDup.push({
              id: `${subjItem.token}+${objItem.token}+${j}`,
              sourceID: subjItem.token,
              targetID: objItem.token,
              type: 'Straight',
              shape: {
                type: 'UmlClassifier',
                relationship: 'Composition'
              }
            })
          }

          if (relationConnection[j]?.type === 'aggregation') {
            arrayWithNoDup.push({
              id: `${subjItem.token}+${objItem.token}+${j}`,
              sourceID: subjItem.token,
              targetID: objItem.token,
              type: 'Straight',
              shape: {
                type: 'UmlClassifier',
                relationship: 'Aggregation'
              }
            })
          }

          if (relationConnection[j]?.type === 'inheritance') {
            arrayWithNoDup.push({
              id: `${subjItem.token}+${objItem.token}+${j}`,
              sourceID: subjItem.token,
              targetID: objItem.token,
              type: 'Straight',
              shape: {
                type: 'UmlClassifier',
                relationship: 'Inheritance'
              }
            })
          }

          if (relationConnection[j]?.type === 'dependency') {
            arrayWithNoDup.push({
              id: `${subjItem.token}+${objItem.token}+${j}`,
              sourceID: subjItem.token,
              targetID: objItem.token,
              type: 'Straight',
              shape: {
                type: 'UmlClassifier',
                relationship: 'Dependency'
              }
            })
          }
        })
      })
    }
  })

  return uniqueArrayOfObject(arrayWithNoDup)
}


