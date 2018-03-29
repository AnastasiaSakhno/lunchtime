import { takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { sessionService } from 'redux-react-session'

import actions from '../actions'
import * as actionTypes from '../actions/types'
import { get, post, put as putRest } from '../utils/rest'
import {getWithoutProjection, MENU_URI} from '../utils/api'

const loadUser = sessionService.loadUser

export function* loadMenu() {
  const menu = yield call(get, MENU_URI)
  yield put(actions.menu.loaded(menu))
}

export function* addMenu({ menu }) {
  const user = yield call(loadUser)
  const newMenu = yield call(post, MENU_URI, user.auth_token, menu)

  if(newMenu.id) {
    yield put(actions.menu.addedSuccessfully(newMenu))
  }
}

export function* removeMenu({ menu }) {
  const user = yield call(loadUser)
  const newMenu = yield call(putRest,
    getWithoutProjection(MENU_URI) + '/' + menu.id,
    user.auth_token, {id: menu.id, name: menu.name, weekDays: menu.weekDays, archive: true})

  if(newMenu.id) {
    yield put(actions.menu.removedSuccessfully(menu))
  }
}

export default function* watchMenus() {
  yield [
    takeLatest(actionTypes.LOAD_MENU, loadMenu),
    takeEvery(actionTypes.ADD_MENU, addMenu),
    takeEvery(actionTypes.REMOVE_MENU, removeMenu)
  ]
}
