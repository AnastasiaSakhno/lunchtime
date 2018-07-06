import {takeLatest, put, call} from 'redux-saga/effects'
import {sessionService} from 'redux-react-session'

import * as actionTypes from '../actions/types'
import actions from '../actions'
import {delCoockie} from '../utils/document'
import {get} from '../utils/rest'
import {USER_DETAILS_URI} from '../utils/api'

export const deleteSession = sessionService.deleteSession
export const saveSession = sessionService.saveSession
export const saveUser = sessionService.saveUser
export const loadUser = sessionService.loadUser

export function* saveAuthData({authToken}) {
  yield call(saveSession, {token: authToken})
  yield call(saveUser, {token: authToken})
  // TODO get user's data and save them
  const user = yield call(get, USER_DETAILS_URI, authToken)
  yield put(actions.auth.googleAuthSuccessfully({
    token: authToken,
    fullName: user.displayName,
    email: user.accountEmail
  }))
}

export function* logout() {
  yield call(saveUser, null)
  yield call(saveSession, null)
  yield call(deleteSession)
  delCoockie('AUTH-TOKEN')
  window.location.reload()
}

export default function* watchAuth() {
  yield [
    takeLatest(actionTypes.SAVE_AUTH_DATA, saveAuthData),
    takeLatest(actionTypes.LOGOUT, logout)
  ]
}
