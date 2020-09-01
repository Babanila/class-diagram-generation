import React from 'react'
const natural = require('natural')

export const UserInputData = React.createContext()

export const initialState = {
  store: [],
  userInput:
    "And the table is theirs which is a type of ours, that is William's book which includes the main story.",
  classes: [],
  relationships: [],
  associations: []
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
  return arrayOfObject.reduce((acc, element) => {
    const itemInAcc = acc.find(
      (item) =>
        item.token === element.token && item.index === element.index && item.type === element.type
    )
    return itemInAcc ? acc : acc.concat(element)
  }, [])
}
