import types from '../constants/ActionTypes'
import createReducer from '../utils/createReducer'
import createRequestHandler from '../utils/createRequestHandler'
import {
  toItems
} from '../utils/actionToStore'

const initialState = {
  tags: [],
  categories: []
}

export default createReducer(initialState, {
  [types.FETCH_TAGS]: createRequestHandler((state, action) => {
    return {
      tags: toItems(action)
    }
  }),
  [types.FETCH_CATEGORIES]: createRequestHandler((state, action) => {
    return {
      categories: toItems(action)
    }
  })
})
