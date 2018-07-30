import {takeLatest, put, call} from 'redux-saga/effects'
import {sessionService} from 'redux-react-session'

import * as actionTypes from '../actions/types'
import actions from '../actions'
import {delCoockie} from '../utils/document'
import {get} from '../utils/rest'
import {USER_DETAILS_URI} from '../utils/api'

export const deleteSession = sessionService.deleteSession
export const deleteUser = sessionService.deleteUser
export const saveSession = sessionService.saveSession
export const saveUser = sessionService.saveUser
export const loadUser = sessionService.loadUser

export function* saveAuthData({authToken}) {
  const response = yield call(get, USER_DETAILS_URI, authToken)

  if(response.id) {
    const data = {token: authToken, email: response.accountEmail}
    yield call(saveSession, data)
    yield call(saveUser, data)
    yield put(actions.auth.loggedInSuccessfully({
      token: authToken,
      fullName: response.displayName,
      email: response.accountEmail
    }))
  } else {
    yield put(actions.auth.loginFailed(response.message))
    yield put(actions.auth.logout())
  }
}

export function* logout() {
  yield call(deleteSession)
  yield call(deleteUser)
  delCoockie('AUTH-TOKEN')
}

export default function* watchAuth() {
  yield [
    takeLatest(actionTypes.SAVE_AUTH_DATA, saveAuthData),
    takeLatest(actionTypes.LOGOUT, logout)
  ]
}
