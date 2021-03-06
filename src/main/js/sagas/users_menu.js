import {takeLatest, takeEvery, put, call} from 'redux-saga/effects'
import {sessionService} from 'redux-react-session'

import {get, post, putUserDayMenu, put as putRest, deleteUserDayMenuTill, duplicateWholeWeekMenu} from '../utils/rest'
import {dateMomentFromString, weekRange} from '../utils/date'
import {USERS_MENU_URI, USERS_MENU_SEARCH_URI, USERS_MENU_BY_ID_URI} from '../utils/api'
import actions from '../actions'
import * as actionTypes from '../actions/types'
import {sendMessage, CHANGE_UDM_MESSAGE} from '../utils/webSocket'

const loadUser = sessionService.loadUser

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

export function* getUserDayMenu({userDayMenu}) {
  const gotten = yield call(get, USERS_MENU_BY_ID_URI({id: userDayMenu.id}))

  if(gotten.id) {
    yield put(actions.usersMenu.gottenSuccessfully(gotten))
  }
}

export function* addUserDayMenu({userDayMenu: udm}) {
  const user = yield call(loadUser)
  const newUserDayMenu = yield call(post, USERS_MENU_URI, user.auth_token, udm)

  if (newUserDayMenu.id) {
    yield getUserDayMenu({userDayMenu: newUserDayMenu})
    sendMessage(CHANGE_UDM_MESSAGE, {...newUserDayMenu})
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

    sendMessage(CHANGE_UDM_MESSAGE, {...udm})
  }
}

export function* updateUserDayMenuOut({userDayMenu: udm}) {
  const user = yield call(loadUser)
  const newUserDayMenu = yield call(putRest, `${USERS_MENU_URI}/${udm.id}`, user.auth_token, udm)

  if (newUserDayMenu.id) {
    yield put(actions.usersMenu.outUpdatedSuccessfully(newUserDayMenu))
    sendMessage(CHANGE_UDM_MESSAGE, {...newUserDayMenu})
  }
}

export function* destroyTillDate({startDate}) {
  const user = yield call(loadUser)
  const response = yield call(deleteUserDayMenuTill, user.auth_token, startDate)
  if(response.status === 200) {
    // TODO handle both cases with alerts
  } else {}
}

function* duplicateWholeWeek({userDayMenu: udm}) {
  const user = yield call(loadUser)
  const response = yield call(duplicateWholeWeekMenu, user.auth_token, udm)
  yield put(actions.usersMenu.changed({active: false, target: null}))
  if(response.status === 200) {
    yield loadUserDayMenu(dateMomentFromString(udm.date))
  } else {}
}

export default function* watchUsersMenu() {
  yield [
    takeLatest(actionTypes.LOAD_USERS_MENU, loadUsersMenu),
    takeEvery(actionTypes.LOAD_NEXT_WEEK, loadNextWeek),
    takeEvery(actionTypes.LOAD_PREV_WEEK, loadPrevWeek),
    takeEvery(actionTypes.ADD_USER_DAY_MENU, addUserDayMenu),
    takeLatest(actionTypes.GET_USER_DAY_MENU, getUserDayMenu),
    takeEvery(actionTypes.UPDATE_USER_DAY_MENU, updateUserDayMenu),
    takeEvery(actionTypes.UPDATE_USER_DAY_MENU_OUT, updateUserDayMenuOut),
    takeEvery(actionTypes.DESTROY_TILL_DATE, destroyTillDate),
    takeLatest(actionTypes.DUPLICATE_USER_DAY_MENU, duplicateWholeWeek)
  ]
}
