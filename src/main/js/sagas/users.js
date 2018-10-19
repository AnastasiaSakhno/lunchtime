import {takeLatest, takeEvery, put, call} from 'redux-saga/effects'

import actions from '../actions'
import * as actionTypes from '../actions/types'
import {get, put as putRest, putUserAuthorities} from '../utils/rest'
import {getWithoutProjection, USER_BY_ID_URI, USERS_URI} from '../utils/api'
import {sessionService} from 'redux-react-session'

const loadUser = sessionService.loadUser

export function* loadUsers() {
  const users = yield call(get, USERS_URI)
  yield put(actions.users.loaded(users))
}

export function* updateUser({user}) {
  const loggedInUser = yield call(loadUser)
  const newUser = yield call(putRest,
    getWithoutProjection(USER_BY_ID_URI(user.id)),
    loggedInUser.auth_token,
    user)

  if (newUser.username) {
    const updatedUser = yield call(get, USER_BY_ID_URI(user.id))
    yield put(actions.users.updatedSuccessfully(updatedUser))
  }
}

export function* updateUserRoles({user}) {
  const loggedInUser = yield call(loadUser)
  const response = yield call(putUserAuthorities, loggedInUser.auth_token, user)

  if (response.status === 204) {
    const updatedUser = yield call(get, USER_BY_ID_URI(user.id))
    yield put(actions.users.rolesUpdatedSuccessfully(updatedUser))
  }
}

export default function* watchUsers() {
  yield [
    takeLatest(actionTypes.LOAD_USERS, loadUsers),
    takeEvery(actionTypes.UPDATE_USER, updateUser),
    takeEvery(actionTypes.UPDATE_USER_ROLES, updateUserRoles)
  ]
}
