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
      acc.find((item) => item.token === element.token && item.index === element.index && item.type === element.type)
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

export function commonWordsRemoval(arrayOfObject) {
  // const commonWords = ['application', 'system', 'data', 'computer', 'user', 'object', 'william']
  // return arrayOfObject.reduce((acc, element) => {
  //   return commonWords.includes(element.token.toLowerCase())
  //     ? arrayOfObject.filter((item) => item.token !== element.token)
  //     : acc
  // }, [])
  return arrayOfObject
}

export function flattenWithNoDuplicateArray(arrayOfArray, duplicateRemoval, filterByType) {
  const arrayWithNoDup = arrayOfArray.map((element) =>
    filterByType(filterByType(duplicateRemoval(element), 'tag', 'NN'), 'type', 'class')
  )
  return [].concat(...arrayWithNoDup)
}

export function relationshipConnectionArray(arrayOfArray) {
  const arrayWithNoDup = arrayOfArray.map((elements, i) => {
    const subjectClass = elements.filter((item) => item.position === 'cl-subject')
    const objectClass = elements.filter((item) => item.position === 'cl-object')
    return objectClass.map((obj, j) => ({
      key: `${i}+${j}`,
      from: subjectClass[0].token ?? 'unknown',
      to: obj.token ?? 'unknown'
    }))
  })
  return arrayWithNoDup
}
