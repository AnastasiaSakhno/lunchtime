import { takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { sessionService } from 'redux-react-session'

import actions from '../actions'
import * as actionTypes from '../actions/types'
import { get, post, put as putRest } from '../utils/rest'
import { RESTAURANTS_URI } from '../utils/api'

const loadUser = sessionService.loadUser

export function* loadRestaurants() {
  const restaurants = yield call(get, RESTAURANTS_URI)
  yield put(actions.restaurants.loaded(restaurants))
}

export function* addRestaurant({ restaurant }) {
  const user = yield call(loadUser)
  const newRestaurant = yield call(post, RESTAURANTS_URI, user.auth_token, restaurant)

  if(newRestaurant.id) {
    yield put(actions.restaurants.addedSuccessfully(newRestaurant))
  }
}

export function* removeRestaurant({ restaurant }) {
  const user = yield call(loadUser)
  const newRestaurant = yield call(putRest,
    `${RESTAURANTS_URI}/${restaurant.id}`,
    user.auth_token, {...restaurant, archive: true})

  if(newRestaurant.id) {
    yield put(actions.restaurants.removedSuccessfully(restaurant))
    yield put(actions.menu.load())
  }
}

export function* restoreRestaurant({ restaurant }) {
  const user = yield call(loadUser)
  const newRestaurant = yield call(putRest,
    `${RESTAURANTS_URI}/${restaurant.id}`,
    user.auth_token, {...restaurant, archive: false})

  if(newRestaurant.id) {
    yield put(actions.restaurants.restoredSuccessfully(restaurant))
    yield put(actions.menu.load())
  }
}

export default function* watchRestaurants() {
  yield [
    takeLatest(actionTypes.LOAD_RESTAURANTS, loadRestaurants),
    takeEvery(actionTypes.ADD_RESTAURANT, addRestaurant),
    takeEvery(actionTypes.REMOVE_RESTAURANT, removeRestaurant),
    takeEvery(actionTypes.RESTORE_RESTAURANT, restoreRestaurant)
  ]
}
