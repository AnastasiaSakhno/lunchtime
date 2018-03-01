import { takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { get, post } from '../utils/rest'
import { USERS_MENU_URI } from '../utils/api'
import actions from '../actions'
import * as actionTypes from '../actions/types'
import { sessionService } from 'redux-react-session'
import moment from 'moment'
import { groupBy } from 'ramda'

const loadUser = sessionService.loadUser

export function* loadUsersMenu() {
  const now = moment()
  const url = USERS_MENU_URI({ from: now.day(1).format('YYYY-MM-DD'), to: now.day(7).format('YYYY-MM-DD') })
  const usersMenu = yield call(get, url)
  let groupedByUsers = groupBy(udm => udm.user.id)(usersMenu._embedded.userDayMenus)
  yield put(actions.usersMenu.loaded({ startDate: now.day(1).format('YYYY-MM-DD'), data: groupedByUsers }))
}

export function* submitUserDayMenu({ userDayMenu }) {
  const user = yield call(loadUser)
  const newUserDayMenu = yield call(post, USERS_MENU_URI, user.auth_token, userDayMenu)

  if(newUserDayMenu.uuid) {
    yield put(actions.usersMenu.submittedSuccessfully(newUserDayMenu))
  }
}

export default function* watchUsersMenu() {
  yield [
    takeLatest(actionTypes.LOAD_USERS_MENU, loadUsersMenu),
    takeEvery(actionTypes.SUBMIT_USER_DAY_MENU, submitUserDayMenu)
  ]
}
