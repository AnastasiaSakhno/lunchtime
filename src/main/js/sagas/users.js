import { takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { sessionService } from 'redux-react-session'

import actions from '../actions'
import * as actionTypes from '../actions/types'
import { get, post } from '../utils/rest'
import { USERS_URI } from '../utils/api'

const loadUser = sessionService.loadUser

export function* loadUsers() {
  const users = yield call(get, USERS_URI)
  yield put(actions.users.loaded(users))
}

export function* addUser({ user }) {
  const sessionUser = yield call(loadUser)
  const newUser = yield call(post, USERS_URI, sessionUser.auth_token, user)

  if(newUser.id) {
    yield put(actions.users.addedSuccessfully(newUser))
  }
}

export default function* watchUsers() {
  yield [
    takeLatest(actionTypes.LOAD_USERS, loadUsers),
    takeEvery(actionTypes.ADD_USER, addUser)
  ]
}
