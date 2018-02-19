import { takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { get, post, put as putRest } from '../utils/rest'
import { MENU_URI } from '../utils/api'
import actions from '../actions'
import * as actionTypes from '../actions/types'
import { sessionService } from 'redux-react-session'

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
    MENU_URI + '/' + menu.id,
    user.auth_token, {...menu, archive: true})

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
