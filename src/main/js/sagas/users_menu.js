import { takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { get, post, putUserDayMenu } from '../utils/rest'
import { USERS_MENU_URI, USERS_MENU_SEARCH_URI } from '../utils/api'
import actions from '../actions'
import * as actionTypes from '../actions/types'
import { sessionService } from 'redux-react-session'
import moment from 'moment'

const loadUser = sessionService.loadUser

export function* loadUsersMenu() {
  const now = moment()
  const weekStart = now.day(1).format('YYYY-MM-DD')
  const weekEnd = now.day(5).format('YYYY-MM-DD')
  const url = USERS_MENU_SEARCH_URI({ from: weekStart, to: weekEnd })
  const usersMenu = yield call(get, url)
  yield put(actions.usersMenu.loaded({ startDate: weekStart, data: usersMenu }))
}

export function* addUserDayMenu({ userDayMenu }) {
  const user = yield call(loadUser)
  const newUserDayMenu = yield call(post, USERS_MENU_URI, user.auth_token, userDayMenu)

  if(newUserDayMenu.id) {
    yield put(actions.usersMenu.addedSuccessfully(userDayMenuWithLinks(userDayMenu, newUserDayMenu)))
  }
}

export function* updateUserDayMenu({ userDayMenu }) {
  const user = yield call(loadUser)
  const newUserDayMenu = yield call(putUserDayMenu, user.auth_token, userDayMenu)

  if(newUserDayMenu.status === 204) {
    yield put(actions.usersMenu.updatedSuccessfully({ id: userDayMenu.id, menu: userDayMenu.menu }))
  }
}

const userDayMenuWithLinks = (udm, nudm) => ({
  ...nudm,
  user: {
    _links: {
      self: {
        href: udm.user
      }
    }
  } ,
  menu: {
    _links: {
      self: {
        href: udm.menu
      }
    }
  }
})

export default function* watchUsersMenu() {
  yield [
    takeLatest(actionTypes.LOAD_USERS_MENU, loadUsersMenu),
    takeEvery(actionTypes.ADD_USER_DAY_MENU, addUserDayMenu),
    takeEvery(actionTypes.UPDATE_USER_DAY_MENU, updateUserDayMenu)
  ]
}
