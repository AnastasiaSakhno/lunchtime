import {takeLatest, takeEvery, put, call} from 'redux-saga/effects'
import {get, post, putUserDayMenu, put as putRest} from '../utils/rest'
import {sessionService} from 'redux-react-session'
import {weekDateFormattedFromObject} from '../utils/date'

import {USERS_MENU_URI, USERS_MENU_SEARCH_URI, USERS_MENU_BY_ID_URI} from '../utils/api'
import actions from '../actions'
import * as actionTypes from '../actions/types'

const loadUser = sessionService.loadUser

const weekRange = (startDate) => {
  const weekStart = weekDateFormattedFromObject(startDate, 1)
  const weekEnd = weekDateFormattedFromObject(startDate, 5)
  return {from: weekStart, to: weekEnd}
}

function* loadUserDayMenu(startDate, plusWeeks = 0) {
  const range = weekRange(startDate.add(plusWeeks, 'weeks'))
  const url = USERS_MENU_SEARCH_URI(range)
  const usersMenu = yield call(get, url)
  yield put(actions.usersMenu.loaded({startDate: range.from, userDayMenus: usersMenu}))
}

export function* loadUsersMenu({startDate}) {
  yield loadUserDayMenu(startDate)
}

export function* loadPrevWeek({startDate}) {
  yield loadUserDayMenu(startDate, -1)
}

export function* loadNextWeek({startDate}) {
  yield loadUserDayMenu(startDate, 1)
}

export function* addUserDayMenu({userDayMenu: udm}) {
  const user = yield call(loadUser)
  const newUserDayMenu = yield call(post, USERS_MENU_URI, user.auth_token, udm)

  if (newUserDayMenu.id) {
    const usersMenu = yield call(get, USERS_MENU_BY_ID_URI({id: newUserDayMenu.id}))
    yield put(actions.usersMenu.addedSuccessfully(usersMenu))
  }
}

export function* updateUserDayMenu({userDayMenu: udm}) {
  const user = yield call(loadUser)
  const response = yield call(putUserDayMenu, user.auth_token, udm)

  if (response.status === 204) {
    // TODO think how to change it only for None menu
    yield put(actions.usersMenu.updateOut({id: udm.id, out: false, date: udm.date}))
    const usersMenu = yield call(get, USERS_MENU_BY_ID_URI({id: udm.id}))
    yield put(actions.usersMenu.updatedSuccessfully(usersMenu))
  }
}

export function* updateUserDayMenuOut({userDayMenu: udm}) {
  const user = yield call(loadUser)
  const newUserDayMenu = yield call(putRest, `${USERS_MENU_URI}/${udm.id}`, user.auth_token, udm)

  if (newUserDayMenu.id) {
    yield put(actions.usersMenu.outUpdatedSuccessfully(newUserDayMenu))
  }
}

export default function* watchUsersMenu() {
  yield [
    takeLatest(actionTypes.LOAD_USERS_MENU, loadUsersMenu),
    takeEvery(actionTypes.LOAD_NEXT_WEEK, loadNextWeek),
    takeEvery(actionTypes.LOAD_PREV_WEEK, loadPrevWeek),
    takeEvery(actionTypes.ADD_USER_DAY_MENU, addUserDayMenu),
    takeEvery(actionTypes.UPDATE_USER_DAY_MENU, updateUserDayMenu),
    takeEvery(actionTypes.UPDATE_USER_DAY_MENU_OUT, updateUserDayMenuOut)
  ]
}
