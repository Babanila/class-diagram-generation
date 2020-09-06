import React from 'react'
const natural = require('natural')
const pluralize = require('pluralize')

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
    .filter((x) => x.toUpperCase() == word.toUpperCase()).length

  const totalLength = str.length
  const percentApp = count / totalLength
  return { count, totalLength, percentApp }
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

export function removeGeneralizedWords(arrayOfObject) {
  const commonWords = ['system', 'application', 'detail', 'address']
  return arrayOfObject.reduce((acc, item) => {
    return commonWords.includes(pluralize.singular(item.token.toLowerCase())) ? acc : acc.concat(item)
  }, [])
}

export function flattenWithNoDuplicateArray(arrayOfArray, duplicateRemoval, filterByType) {
  const arrayWithNoDup = arrayOfArray.map((element) => filterByType(duplicateRemoval(element), 'type', 'class'))
  return [].concat(...arrayWithNoDup)
}

export function relationshipConnectionArray(arrayOfArray) {
  const { classes } = arrayOfArray
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
