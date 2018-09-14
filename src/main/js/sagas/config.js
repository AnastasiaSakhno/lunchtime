import {takeLatest, put, call} from 'redux-saga/effects'

import actions from '../actions'
import * as actionTypes from '../actions/types'
import {get} from '../utils/rest'
import {CONFIG_URI} from '../utils/api'

export function* loadConfig() {
  const config = yield call(get, CONFIG_URI)
  yield put(actions.config.loaded(config))
}

export default function* watchConfig() {
  yield [
    takeLatest(actionTypes.LOAD_CONFIG, loadConfig)
  ]
}
