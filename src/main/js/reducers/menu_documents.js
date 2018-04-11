import * as actionTypes from '../actions/types'
import {removeCollectionProjection} from '../utils/api'

export const initialState = []

const findMethod = (md, action) => md.restaurant.name === action.menuDocument.restaurant.name

const menuDocuments = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.MENU_DOCUMENTS_LOADED:
    let data = removeCollectionProjection(action, 'menuDocuments', ['user', 'restaurant'])
    return [...data]

  case actionTypes.MENU_DOCUMENT_CONTENT_LOADED_SUCCESSFULLY:
    return state.map((md) => {
      if (findMethod(md, action)) {
        return { ...md, content: action.content }
      }
      return md
    })

  case actionTypes.MENU_DOCUMENT_UPLOADED_SUCCESSFULLY:
    let found = state.find((md) => findMethod(md, action))
    if(found) {
      return state.map((md) => {
        if (findMethod(md, action)) {
          return { ...md }
        }
        return md
      })
    }
    return [
      ...state,
      action.menuDocument
    ]


  default:
    return state
  }
}

export default menuDocuments
