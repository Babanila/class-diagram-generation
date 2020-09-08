import React from 'react'
const natural = require('natural')
const lemmatize = require('wink-lemmatizer')

export const UserInputData = React.createContext()

export const initialState = {
  userInput:
    'The Library system is used by the Informatics Students and Faculty. The Library contains Books and Journals. Books can be issued to both the Students and Faculty. Journals can only be issued to the Faculty. Books and Journals can only be issued by the Librarian. The deputy-Librarian is in-charge of receiving the Returned Books and Journals. The Accountant is responsible for receiving the fine for over-due Books. Fine is charged only to Students, and not to the Faculty.',
  // 'The cashier stored the customer details like  customer_name, customer_age,  and customer_address. The player saved the club details which includes the club name, club age,  and club address.',
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
  // const commonWords = ['system', 'application', 'detail', 'address']
  const commonWords = []
  return arrayOfObject.reduce((acc, item) => {
    return commonWords.includes(lemmatize.noun(item.token.toLowerCase())) ? acc : acc.concat(item)
  }, [])
}

export function flattenWithNoDuplicateArray(arrayOfArray, duplicateRemoval, filterByType) {
  const arrayWithNoDup = arrayOfArray.map((element) => filterByType(duplicateRemoval(element), 'type', 'class'))
  return [].concat(...arrayWithNoDup)
}

export function uniqueArrayOfObject(arrayOfObject){
  return arrayOfObject.filter(item => item).reduce(
    (acc, element) =>
      acc.find((item) => item.from.toLowerCase() === element.from.toLowerCase() && item.to.toLowerCase() === element.to.toLowerCase())
        ? acc
        : acc.concat(element),
    []
  )
} 


export function relationshipConnectionArray(arrayOfArray) {
  const { classes } = arrayOfArray
  const arrayWithNoDup = []
  
  classes.map((elements, i) => {
    const subjectClass = elements.filter((item) =>  item.position === 'cl-subject')
    const objectClass = elements.filter((item) =>  item.position === 'cl-object')

    if(subjectClass.length > 0 && objectClass.length > 0){
      subjectClass.map(subjItem => {
        objectClass.map(objItem => {
          arrayWithNoDup.push ({
            from: subjItem.token,
            to: objItem.token,
            routing: go.Link.Orthogonal
          })
        })
      })
    }
  })

  return uniqueArrayOfObject(arrayWithNoDup)
}
