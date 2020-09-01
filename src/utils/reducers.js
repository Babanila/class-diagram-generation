import { initialState } from '../utils/helpers'

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'UPDATE_INPUT':
      return { ...state, userInput: payload }
    case 'UPDATE_CLASSES':
      return { ...state, classes: [...state.classes, payload] }
    case 'UPDATE_RELATIONSHIPS':
      return { ...state, relationships: [...state.relationships, payload] }
    case 'UPDATE_COMPOUNDNOUN':
      return { ...state, compoundNoun: [...state.compoundNoun, payload] }
    default:
      return state
  }
}
