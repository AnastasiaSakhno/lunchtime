import { takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { get, post, del } from '../utils/rest'
import { RESTAURANTS_URI } from "../utils/api"
import actions from '../actions'
import * as actionTypes from '../actions/types'
import { sessionService } from 'redux-react-session'

const loadUser = sessionService.loadUser

export function* loadRestaurants() {
  const restaurants = yield call(get, RESTAURANTS_URI)
  yield put(actions.restaurants.loaded(restaurants))
}

export function* addRestaurant({ restaurant }) {
  const user = yield call(loadUser)
  yield call(post, RESTAURANTS_URI, user.auth_token, restaurant)
}

export function* removeRestaurant({ restaurant }) {
  const user = yield call(loadUser)
  yield call(del, RESTAURANTS_URI, user.auth_token, restaurant)
  yield put(actions.restaurants.removedSuccessfully(restaurant))
}

export default function* watchRestaurants() {
  yield [
    takeLatest(actionTypes.LOAD_RESTAURANTS, loadRestaurants),
    takeEvery(actionTypes.ADD_RESTAURANT, addRestaurant),
    takeEvery(actionTypes.REMOVE_RESTAURANT, removeRestaurant)
  ]
}
