import { takeEvery, put, call } from 'redux-saga/effects'
import * as actionTypes from '../actions/types'
import actions from '../actions'
import { browserHistory } from 'react-router'
import { sessionService } from 'redux-react-session'

function* login({ user }) {
  try {
    const data = yield call('/login', user.email, user.password)
    yield put(actions.auth.loginSuccess(user, data))
  } catch(error) {
    // TODO new action
    console.log(error)
  }
}

function* loginSuccess({ user, data }) {
  yield call(sessionService.saveSession, { token: data.auth_token })
  yield call(sessionService.saveUser, data)
  yield call(browserHistory.replace, '/')
}

function* logout() {
  sessionService.deleteSession()
  sessionService.saveUser(null)
  browserHistory.replace('/login')
}

export default function* watchAuth() {
  yield [
    takeEvery(actionTypes.LOGIN, login),
    takeEvery(actionTypes.LOGIN_SUCCESS, loginSuccess),
    takeEvery(actionTypes.LOGOUT, logout)
  ]
}
