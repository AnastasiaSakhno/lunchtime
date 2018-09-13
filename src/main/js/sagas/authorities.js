import {takeLatest, put, call} from 'redux-saga/effects'

import actions from '../actions'
import * as actionTypes from '../actions/types'
import {get} from '../utils/rest'
import {AUTHORITIES_URI} from '../utils/api'

export function* loadAuthorities() {
  const authorities = yield call(get, AUTHORITIES_URI)
  yield put(actions.authorities.loaded(authorities))
}

export default function* watchAuthorities() {
  yield [
    takeLatest(actionTypes.LOAD_AUTHORITIES, loadAuthorities)
  ]
}
