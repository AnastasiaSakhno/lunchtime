import {takeLatest, put, call} from 'redux-saga/effects'

import actions from '../actions'
import * as actionTypes from '../actions/types'
import {get} from '../utils/rest'
import {USERS_URI} from '../utils/api'

export function* loadUsers() {
  const users = yield call(get, USERS_URI)
  yield put(actions.users.loaded(users))
}

export default function* watchUsers() {
  yield [
    takeLatest(actionTypes.LOAD_USERS, loadUsers)
  ]
}
