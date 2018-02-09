import {takeEvery, put, call} from 'redux-saga/effects'
import * as actionTypes from '../actions/types'
import actions from '../actions'
import {sessionService} from 'redux-react-session'
import {post} from '../utils/rest'

export const deleteSession = sessionService.deleteSession
export const saveSession = sessionService.saveSession
export const saveUser = sessionService.saveUser


export function* login({user}) {
  let data = yield call(post, '/login', {email: user.email, password: user.password})
  if (data.status === 200) {
    console.log(data)
    yield put(actions.auth.loggedInSuccessfully(data))
  } else {
    yield put(actions.auth.loginFailed(data.error + ': ' + data.message))
  }
}

export function* loggedInSuccessfully({data}) {
  yield call(saveSession, {token: data.refreshToken})
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
