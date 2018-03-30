import {takeEvery, put, call} from 'redux-saga/effects'

import * as actionTypes from '../actions/types'
import actions from '../actions'
import {signUp} from '../utils/rest'

export function* signup({user}) {
  const response = yield call(signUp, user)

  if(response.status === 201) {
    yield put(actions.auth.login(user))
  } else {
    yield put(actions.registrations.signupFailed(response.status))
  }
}

export default function* watchRegistrations() {
  yield [
    takeEvery(actionTypes.SIGNUP, signup)
  ]
}
