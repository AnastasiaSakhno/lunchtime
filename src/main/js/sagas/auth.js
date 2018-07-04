import {takeLatest, put, call} from 'redux-saga/effects'
import * as actionTypes from '../actions/types'
import actions from '../actions'
import {sessionService} from 'redux-react-session'
import {getSession, signUp} from '../utils/rest'

export const deleteSession = sessionService.deleteSession
export const saveSession = sessionService.saveSession
export const saveUser = sessionService.saveUser

export function* googleAuthSuccessfully({data}) {
  console.log('--------', data)
  yield put(actions.auth.signup({
    email: data.profileObj.email,
    fullName: data.profileObj.name,
    uid: data.googleId,
    provider: 'google'
  }))
}

export function* googleAuthFailed({data}) {
  console.log('--------', data)
}

export function* login({user}) {
  let data = yield call(getSession, {...user})
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
  yield call(saveSession, null)
  yield call(deleteSession)
}

export function* signup({user}) {
  const response = yield call(signUp, user)

  if(response.status === 201) {
    yield put(actions.auth.login(user))
    yield put(actions.users.load())
  } else {
    yield put(actions.registrations.signupFailed(response.status))
  }
}

export default function* watchAuth() {
  yield [
    takeLatest(actionTypes.GOOGLE_AUTH_SUCCESSFULLY, googleAuthSuccessfully),
    takeLatest(actionTypes.GOOGLE_AUTH_FAILED, googleAuthFailed),
    takeLatest(actionTypes.LOGIN, login),
    takeLatest(actionTypes.LOGIN_SUCCESS, loggedInSuccessfully),
    takeLatest(actionTypes.LOGOUT, logout),
    takeLatest(actionTypes.SIGNUP, signup)
  ]
}
