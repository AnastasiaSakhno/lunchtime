import * as actionTypes from './types'

export const load = () => ({
  type: actionTypes.LOAD_MENU_DOCUMENTS
})

export const loaded = (menuDocuments) => ({
  type: actionTypes.MENU_DOCUMENTS_LOADED,
  menuDocuments
})

export const contentLoadedSuccessfully = ({ menuDocument, content }) => ({
  type: actionTypes.MENU_DOCUMENT_CONTENT_LOADED_SUCCESSFULLY,
  menuDocument, content
})

export const upload = (menuDocument) => ({
  type: actionTypes.UPLOAD_MENU_DOCUMENT,
  menuDocument
})

export const uploadedSuccessfully = (menuDocument) => ({
  type: actionTypes.MENU_DOCUMENT_UPLOADED_SUCCESSFULLY,
  menuDocument
})
