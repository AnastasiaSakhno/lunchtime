import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects'
import { sessionService } from 'redux-react-session'

import actions from '../actions'
import * as actionTypes from '../actions/types'
import { get, apiCall, getMenuDocumentContent } from '../utils/rest'
import { MENU_DOCUMENTS_URI } from '../utils/api'

const loadUser = sessionService.loadUser

export function* loadMenuDocuments() {
  const menuDocuments = yield call(get, MENU_DOCUMENTS_URI)
  yield put(actions.menuDocuments.loaded(menuDocuments))

  const menuDocumentsContent = yield all(menuDocuments.map((md) => {
    return call(getMenuDocumentContent, md)
  }))

  yield all(menuDocumentsContent.map((content, index) => (
    put(actions.menuDocuments.contentLoadedSuccessfully({ menuDocument: menuDocuments[index], content: content }))
  )))
}

export function* uploadMenuDocument({ menuDocument }) {
  const user = yield call(loadUser)

  let formData = new FormData()
  formData.append('file', menuDocument.file)
  formData.append('restaurant', menuDocument.restaurant)
  formData.append('user', user.email)

  const newMenuDocument = yield call(apiCall, MENU_DOCUMENTS_URI, {
    method: 'POST',
    body: formData
  })

  if(newMenuDocument.uuid) {
    yield put(actions.menuDocuments.uploadedSuccessfully(newMenuDocument))
    const menuDocumentContent = yield call(getMenuDocumentContent, newMenuDocument)
    yield put(
      actions.menuDocuments.contentLoadedSuccessfully({ menuDocument: newMenuDocument, content: menuDocumentContent })
    )
  }
}

export default function* watchMenuDocuments() {
  yield [
    takeLatest(actionTypes.LOAD_MENU_DOCUMENTS, loadMenuDocuments),
    takeEvery(actionTypes.UPLOAD_MENU_DOCUMENT, uploadMenuDocument)
  ]
}
