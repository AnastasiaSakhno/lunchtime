import * as actionTypes from '../actions/types'

export const initialState = []

const menuDocuments = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.MENU_DOCUMENTS_LOADED:
    return [...action.menuDocuments]

  case actionTypes.MENU_DOCUMENT_UPLOADED_SUCCESSFULLY:
    let found = state.find((md) => md.restaurantName === action.menuDocument.restaurantName)
    if(found) {
      return state.map((menuDocument) => {
        if (menuDocument.restaurantName === action.menuDocument.restaurantName) {
          return { ...menuDocument }
        }
        return menuDocument
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
