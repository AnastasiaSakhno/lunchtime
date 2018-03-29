import { takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { sessionService } from 'redux-react-session'

import actions from '../actions'
import * as actionTypes from '../actions/types'
import { get, post, put as putRest } from '../utils/rest'
import {DAYS_URI, DAYS_SEARCH_URI, getWithoutProjection} from '../utils/api'
import {weekRange} from '../utils/date'

const loadUser = sessionService.loadUser

function* loadDaysRange(startDate, plusWeeks = 0) {
  const range = weekRange(startDate.add(plusWeeks, 'weeks'))
  const url = DAYS_SEARCH_URI(range)
  const days = yield call(get, url)
  yield put(actions.days.loaded({startDate: range.from, days: days}))
}

export function* loadDays({startDate}) {
  yield loadDaysRange(startDate)
}

export function* loadPrevWeek({startDate}) {
  yield loadDaysRange(startDate, -1)
}

export function* loadNextWeek({startDate}) {
  yield loadDaysRange(startDate, 1)
}

export function* addDay({ day }) {
  const user = yield call(loadUser)
  const newDay = yield call(post, DAYS_URI, user.auth_token, day)

  if(newDay.id) {
    yield put(actions.days.addedSuccessfully(newDay))
  }
}

export function* updateDay({ day }) {
  const user = yield call(loadUser)
  const newDay = yield call(putRest,
    getWithoutProjection(DAYS_URI) + '/' + day.id,
    user.auth_token, {id: day.id, closed: day.closed, date: day.date})

  if(newDay.id) {
    yield put(actions.days.updatedSuccessfully(day))
  }
}

export default function* watchDays() {
  yield [
    takeLatest(actionTypes.LOAD_DAYS, loadDays),
    takeEvery(actionTypes.LOAD_NEXT_WEEK, loadNextWeek),
    takeEvery(actionTypes.LOAD_PREV_WEEK, loadPrevWeek),
    takeEvery(actionTypes.ADD_DAY, addDay),
    takeEvery(actionTypes.UPDATE_DAY, updateDay)
  ]
}
