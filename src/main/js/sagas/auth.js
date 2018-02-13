import {takeEvery, put, call} from 'redux-saga/effects'
import * as actionTypes from '../actions/types'
import actions from '../actions'
import {sessionService} from 'redux-react-session'
import {getSession} from '../utils/rest'

export const deleteSession = sessionService.deleteSession
export const saveSession = sessionService.saveSession
export const saveUser = sessionService.saveUser


export function* login({user}) {
  let data = yield call(getSession, {email: user.email, password: user.password})
  if (data.status === 200) {
    yield put(actions.auth.loggedInSuccessfully({ email: user.email, ...data }))
  } else {
    yield put(actions.auth.loginFailed(data.status === 401 ? 'Bad credentials' : 'Server error'))
  }
}

export function* loggedInSuccessfully({ data }) {
  yield call(saveSession, {token: data.auth_token})
  yield call(saveUser, data)
}

export function* logout() {
  yield call(saveUser, null)
  yield call(deleteSession)
}

export default function* watchAuth() {
  yield [
    takeEvery(actionTypes.LOGIN, login),
    takeEvery(actionTypes.LOGIN_SUCCESS, loggedInSuccessfully),
    takeEvery(actionTypes.LOGOUT, logout)
  ]
}
