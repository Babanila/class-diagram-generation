import React from 'react'
const natural = require('natural')

export const UserInputData = React.createContext()

export const initialState = {
  userInput: '',
  classes: [],
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
      acc.find(
        (item) =>
          item.token.toLowerCase() === element.token.toLowerCase() &&
          item.index === element.index &&
          item.type === element.type
      )
        ? acc
        : acc.concat(element),
    []
  )
}

export function filterArrayByType(arr, propertyType, filterByType = '') {
  return filterByType !== '' ? arr.filter((item) => item[propertyType] === filterByType) : arr
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

export function flattenWithNoDuplicateArray(arrayOfArray, duplicateRemoval, filterByType) {
  const arrayWithNoDup = arrayOfArray.map((element) => filterByType(duplicateRemoval(element), 'type', 'class'))
  return [].concat(...arrayWithNoDup)
}

export function relationshipConnectionArray(arrayOfArray) {
  const { classes, relationships } = arrayOfArray
  const arrayWithNoDup = classes.map((elements, i) => {
    const subjectClass = elements.filter((item) => item.position === 'cl-subject')
    const objectClass = elements.filter((item) => item.position === 'cl-object')
    return subjectClass.length || subjectClass.objectClass
      ? {
          token: -i,
          from: subjectClass[0].token ?? 'default',
          to: objectClass[0].token ?? 'default',
          routing: go.Link.Orthogonal
        }
      : {}
  })
  return arrayWithNoDup
}
