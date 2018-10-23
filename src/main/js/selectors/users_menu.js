import {createSelector} from 'reselect'
import {groupBy, find, isNil, pipe, map} from 'ramda'

import {getMenu} from './menu'
import {dateMomentFromString} from '../utils/date'
import {href} from '../utils/object'

export const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
export const WEEK_DAYS_ABBREVIATIONS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
export const udmDateString = udm => udm.date
const udmDayOfWeekString = udm => WEEK_DAYS[dateMomentFromString(udm.date).isoWeekday() - 1]
const udmMenuId = udm => udm.menu.id

export const getUsersMenu = (state) => state.usersMenu

const getUsersMenuData = (state) => state.usersMenu.data ? state.usersMenu.data : []

export const groupedByUser = createSelector(
  [getUsersMenuData],
  (data) => groupBy(udm => href(udm.user))(data)
)

export const groupedByWeekDayAndMenu = createSelector(
  [getUsersMenuData],
  (data) => (
    pipe(
      groupBy(udmDayOfWeekString),
      map(groupBy(udmMenuId))
    )(data)
  )
)

export const summaryValues = createSelector(
  [getMenu, groupedByWeekDayAndMenu],
  (menuList, byWeekDayAndMenu) => (
    WEEK_DAYS.map(wd => {
      const byMenu = byWeekDayAndMenu[wd]
      if (isNil(byMenu)) {
        return []
      }
      return Object.keys(byMenu).map(mid => {
        const menu = find(m => m.id.toString() === mid.toString())(menuList)
        if (isNil(menu)) {
          return {}
        }
        return (
          {
            name: menu.name,
            colorHex: menu.colorHex,
            count: byMenu[mid].length,
            out: byMenu[mid].filter(udm => udm.out).length
          })
      })
    })
  )
)
