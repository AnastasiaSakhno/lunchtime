import { takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { get, post, putUserDayMenu, put as putRest } from '../utils/rest'
import { USERS_MENU_URI, USERS_MENU_SEARCH_URI } from '../utils/api'
import actions from '../actions'
import * as actionTypes from '../actions/types'
import { sessionService } from 'redux-react-session'
import moment from 'moment'

const loadUser = sessionService.loadUser

const userDayMenuWithLinks = (udm, nudm) => ({
  ...nudm,
  user: {
    _links: {
      self: {
        href: udm.user
      }
    }
  },
  menu: {
    _links: {
      self: {
        href: udm.menu
      }
    }
  }
})

export function* loadUsersMenu() {
  const now = moment()
  const weekStart = now.day(1).format('YYYY-MM-DD')
  const weekEnd = now.day(5).format('YYYY-MM-DD')
  const url = USERS_MENU_SEARCH_URI({ from: weekStart, to: weekEnd })
  const usersMenu = yield call(get, url)
  yield put(actions.usersMenu.loaded({ startDate: weekStart, data: usersMenu }))
}

export function* addUserDayMenu({ userDayMenu: udm }) {
  const user = yield call(loadUser)
  const newUserDayMenu = yield call(post, USERS_MENU_URI, user.auth_token, udm)

  if(newUserDayMenu.id) {
    yield put(actions.usersMenu.addedSuccessfully(userDayMenuWithLinks(udm, newUserDayMenu)))
  }
}

export function* updateUserDayMenu({ userDayMenu: udm }) {
  const user = yield call(loadUser)
  const response = yield call(putUserDayMenu, user.auth_token, udm)

  if(response.status === 204) {
    yield put(actions.usersMenu.updatedSuccessfully({ id: udm.id, menu: udm.menu }))
    // TODO think how change it only for None menu
    yield put(actions.usersMenu.updateOut({id: udm.id, out: false, date: udm.date}))
  }
}

export function* updateUserDayMenuOut({ userDayMenu: udm }) {
  const user = yield call(loadUser)
  const newUserDayMenu = yield call(putRest, `${USERS_MENU_URI}/${udm.id}`, user.auth_token, udm)

  if(newUserDayMenu.id) {
    yield put(actions.usersMenu.outUpdatedSuccessfully(newUserDayMenu))
  }
}

export default function* watchUsersMenu() {
  yield [
    takeLatest(actionTypes.LOAD_USERS_MENU, loadUsersMenu),
    takeEvery(actionTypes.ADD_USER_DAY_MENU, addUserDayMenu),
    takeEvery(actionTypes.UPDATE_USER_DAY_MENU, updateUserDayMenu),
    takeEvery(actionTypes.UPDATE_USER_DAY_MENU_OUT, updateUserDayMenuOut)
  ]
}
