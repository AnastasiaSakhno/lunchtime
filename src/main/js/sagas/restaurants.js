import { takeLatest, takeEvery, put, call } from 'redux-saga/effects'
import { restaurantsAPI } from '../utils/api'
import actions from '../actions'
import * as actionTypes from '../actions/types'

export function* loadRestaurants() {
  const links = yield call(restaurantsAPI.getCollection, {})

  yield put(actions.restaurants.loaded(links))
}

export function* addRestaurant({ restaurant }) {
  console.log(restaurant)
  yield call(restaurantsAPI.post, restaurant)
}

export function* removeRestaurant({ restaurant }) {
  yield call(restaurantsAPI.destroy, restaurant)
  yield put(actions.restaurants.removedSuccessfully(restaurant))
}

export default function* watchRestaurants() {
  yield [
    takeLatest(actionTypes.LOAD_RESTAURANTS, loadRestaurants),
    takeEvery(actionTypes.ADD_RESTAURANT, addRestaurant),
    takeEvery(actionTypes.REMOVE_RESTAURANT, removeRestaurant)
  ]
}
