import { takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { get, post } from '../utils/rest'
import { USERS_MENU_URI } from '../utils/api'
import actions from '../actions'
import * as actionTypes from '../actions/types'
import { sessionService } from 'redux-react-session'

const loadUser = sessionService.loadUser

export function* loadUsersMenu() {
  const usersMenu = yield call(get, USERS_MENU_URI)
  yield put(actions.usersMenu.loaded(usersMenu))
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
