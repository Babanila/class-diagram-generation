import { initialState } from '../utils/helpers'

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'UPDATE_INPUT':
      return { ...state, userInput: payload }
    case 'UPDATE_STORE':
      return { ...state, store: payload }
    case 'UPDATE_CLASSES':
      return { ...state, classes: [...state.classes, payload] }
    case 'UPDATE_RELATIONSHIP':
      return { ...state, relationships: [...state.relationship, payload] }
    case 'UPDATE_ASSOCIATION':
      return { ...state, associations: [...state.association, payload] }
    default:
      return state
  }
}
