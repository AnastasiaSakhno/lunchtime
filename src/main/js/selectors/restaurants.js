import {createSelector} from 'reselect'

export const getRestaurants = (state) => state.restaurants

export const active = createSelector(
  [getRestaurants],
  (md) => md.filter(m => !m.archive)
)
