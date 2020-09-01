const lemmatize = require('wink-lemmatizer')

// Actor Extractor
export function acexRule(arr) {
  const acexInheritanceRelationship = []
  const acexCompoundNoun = []
  const acexAllClasses = []

  arr.filter((element, i) => {
    if (element.token.toLowerCase() === 'as' && element.tag === 'IN') {
      for (let k = i + 1; k < i + 3; k++) {
        if (arr[k].tag === 'DT' && arr[k + 1].tag === 'JJ' && arr[k + 2].tag === 'NN') {
          acexCompoundNoun.push({
            token: `${arr[k].token} ${arr[k + 1].token} ${arr[k + 2].token}`,
            startIndex: k,
            endIndex: k + 2,
            type: 'compound-noun'
          })
          acexInheritanceRelationship.push({ ...arr[k + 1], index: k + 1, type: 'inheritance' })
          acexAllClasses.push({ ...arr[k + 2], index: k + 2, type: 'actor' })
          return
        } else if (arr[k].tag === 'DT' && arr[k + 1].tag === 'NN') {
          acexCompoundNoun.push({
            token: `${arr[k].token} ${arr[k + 1].token}`,
            startIndex: k,
            endIndex: k + 1,
            type: 'compound-noun'
          })
          acexAllClasses.push({ ...arr[k + 1], index: k + 1, type: 'actor' })
          return
        } else if (arr[k].tag === 'NN') {
          acexAllClasses.push({ ...arr[k], index: k, type: 'actor' })
          return
        } else {
          return
        }
      }
    }
  })

  const acexClass = { acexInheritanceRelationship, acexCompoundNoun, acexAllClasses }
  return acexClass
}

// Class Extractor
export function clexRule(arr, removeDuplicate) {
  const allClasses = []
  arr.filter((element, i) => {
    const verbForm = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
    if (verbForm.includes(element.tag)) {
      // Subject
      for (let k = 0; k < i; k++) {
        if (arr[k].tag === 'NN') allClasses.push({ ...arr[k], index: k, type: 'class' })
        if (arr[k].tag === 'NNS') allClasses.push({ ...arr[k], index: k, type: 'class' })
        if (arr[k].tag === 'NNP') allClasses.push({ ...arr[k], index: k, type: 'non-class' })
      }

      // Object
      for (let k = i; k < arr.length; k++) {
        if (arr[k].tag === 'NN') allClasses.push({ ...arr[k], index: k, type: 'class' })
        if (arr[k].tag === 'NNS') allClasses.push({ ...arr[k], index: k, type: 'class' })
        if (arr[k].tag === 'NNP') allClasses.push({ ...arr[k], index: k, type: 'non-class' })
      }
    }

    // possessive Apostrophe (')
    if (arr[i].token === 's' && arr[i].tag === 'PRP') {
      allClasses.push({ ...arr[i - 1], index: i - 1, type: 'class' })
    }

    // Preposition (of, for, to etc.)
    const condition2 =
      (arr[i].token === 'of' && arr[i].tag === 'IN') ||
      (arr[i].token === 'for' && arr[i].tag === 'IN') ||
      (arr[i].token === 'to' && arr[i].tag === 'TO')

    if (condition2) {
      if (arr[i + 1].tag === 'DT' && arr[i + 2].tag === 'JJ' && arr[i + 3].tag === 'NN') {
        allClasses.push({ ...arr[i + 3], index: i + 3, type: 'class' })
      } else if (arr[i + 1].tag === 'DT' && arr[i + 2].tag === 'NN') {
        allClasses.push({ ...arr[i + 2], index: i + 2, type: 'class' })
      } else if (arr[i + 1].tag === 'NN') {
        allClasses.push({ ...arr[i + 1], index: i + 1, type: 'class' })
      } else {
        return null
      }
    }

    // Conjuction (if, but, and etc.)
    const condition3 =
      (arr[i].token === 'if' && arr[i].tag === 'IN') ||
      (arr[i].token === 'but' && arr[i].tag === 'CC') ||
      (arr[i].token === 'and' && arr[i].tag === 'CC')

    if (condition3) {
      if (arr[i + 1].tag === 'DT' && arr[i + 2].tag === 'JJ' && arr[i + 3].tag === 'NN') {
        allClasses.push({ ...arr[i + 3], index: i + 3, type: 'class' })
      } else if (arr[i + 1].tag === 'DT' && arr[i + 2].tag === 'NN') {
        allClasses.push({ ...arr[i + 2], index: i + 2, type: 'class' })
      } else if (arr[i + 1].tag === 'NN') {
        allClasses.push({ ...arr[i + 1], index: i + 1, type: 'class' })
      } else {
        return null
      }
    }
  })

  const clexClasses = [...removeDuplicate([...allClasses])]
  return clexClasses
}

export function relpexRule(arr, removeDuplicate) {
  const allVerbs = []
  const associationRelp = []
  const compostionRelp = []
  const aggregationRelp = []
  const inheritanceRelp = []

  arr.map((element, i) => {
    // Verb
    const verbForm = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
    if (verbForm.includes(element.tag)) {
      allVerbs.push({ ...element, index: i, type: 'verb' })
    }

    // Association Relationship
    const prepositionForm = [
      's',
      'for',
      'from',
      'in',
      'on',
      'of',
      'to',
      'about',
      'with',
      'his',
      'her',
      'my',
      'mine',
      'our',
      'ours',
      'your',
      'yours',
      'their',
      'theirs'
    ]

    if (prepositionForm.includes(element.token)) {
      associationRelp.push({ ...element, index: i, type: 'association' })
    }

    // Composition & Aggregation Relationships
    const compositionForm = ['include', 'contain', 'comprise', 'have', 'part of']
    if (compositionForm.includes(lemmatize.verb(element.token))) {
      // change verb to basic form for identification purposes
      compostionRelp.push({ ...element, index: i, type: 'composition' }) // Composition
      aggregationRelp.push({ ...element, index: i, type: 'aggregation' }) // Aggregation
    }
  })

  // Inheritance Relationship
  // The verb "to be" connects the two objects then inheritance relationships exist ...
  // ... between them with the object as the parent class.

  const inheritanceForm = ['is kind of', 'is a type of', 'to be']
  const stringForm = arr.map((item) => item.token).join(' ')
  inheritanceForm.map((element, i) => {
    if (stringForm.includes(element)) {
      inheritanceRelp.push({ token: element, index: i, type: 'inheritance' })
    }
  })

  const relpexVerb = {
    associationRelp,
    compostionRelp,
    aggregationRelp,
    inheritanceRelp,
    allVerbs: removeDuplicate([...allVerbs]),
    allRelationships: [
      ...associationRelp,
      ...compostionRelp,
      ...aggregationRelp,
      ...inheritanceRelp
    ]
  }
  return relpexVerb
}

export function classExtraction(inputArray, rule1, rule2, rule3, duplicateRemoval) {
  const classes = {}

  classes.acexClass = rule1(inputArray)
  classes.clexClass = rule2(inputArray, duplicateRemoval)
  classes.relpexVerb = rule3(inputArray, duplicateRemoval)
  return classes
}
