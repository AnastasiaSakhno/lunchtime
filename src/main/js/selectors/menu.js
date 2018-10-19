import {createSelector} from 'reselect'

export const getMenu = (state) => state.menu

export const activeMenu = createSelector(
  [getMenu],
  (menu) => menu.filter(m => !m.archive && (!m.restaurant || !m.restaurant.archive))
)
