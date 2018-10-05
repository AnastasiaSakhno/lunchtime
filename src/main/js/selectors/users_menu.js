import {createSelector} from 'reselect'
import {groupBy} from 'ramda'

import {getMenu, NONE} from './menu'
import {getUsers} from './users'
import {weekDateFormattedFromString} from '../utils/date'
import {href} from '../utils/object'

export const udmDateString = udm => udm.date
export const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
export const WEEK_DAYS_ABBREVIATIONS = ['MON', 'TUE', 'WED', 'THU', 'FRI']

export const getUsersMenu = (state) => state.usersMenu

const getUsersMenuData = (state) => state.usersMenu.data ? state.usersMenu.data : []

export const groupedByUser = createSelector(
  [getUsersMenuData],
  (data) => groupBy(udm => href(udm.user))(data)
)

export const groupedByMenu = createSelector(
  [getUsersMenuData],
  (data) => groupBy(udm => href(udm.menu))(data)
)

export const groupedByDate = createSelector(
  [getUsersMenuData],
  (data) => groupBy(udmDateString)(data.filter(udm => udm.menu.name !== NONE))
)

export const groupedByMenuAndDate = createSelector(
  [groupedByMenu],
  (byMenu) => (
    Object.entries(byMenu).map(entry => {
      const [menuHref, arr] = entry
      let byDate = groupBy(udmDateString)(arr)
      return {menu: {href: menuHref}, groupedByDate: byDate}
    })
  )
)

const menuDayCount = (menu, date, users, byDate, arr) => {
  let count = arr ? arr.length : 0
  if (menu.name === NONE) {
    count = users.length
    let totalDateArr = byDate[date]
    if (totalDateArr) {
      count = count - totalDateArr.length
    }
  }
  return count
}

const menuDayOutCount = (arr) => arr ? arr.filter(udm => udm.out).length : 0

const menuSummaryRow = (menu, users, byDate, menuStatistics, usersMenu) => (
  WEEK_DAYS.map((day, index) => {
    let date = weekDateFormattedFromString(usersMenu.startDate, index + 1)
    let arr = menuStatistics ? menuStatistics.groupedByDate[date] : []
    let count = menuDayCount(menu, date, users, byDate, arr)
    let outCount = menuDayOutCount(arr)
    return {name: menu.name, count: count, out: outCount}
  })
)

const menuSummary = (menu, byMenuAndDate) => byMenuAndDate.find(gmd => gmd.menu.href === href(menu))

export const orderedMenu = createSelector(
  [getMenu, groupedByMenu],
  (menuList, byMenu) => menuList.filter(m => m.name === NONE || byMenu[href(m)])
)

export const summaryValues = createSelector(
  [getUsersMenu, orderedMenu, getUsers, groupedByMenuAndDate, groupedByDate],
  (usersMenu, menuList, users, byMenuAndDate, byDate) => (
    menuList.map(menu => {
      let menuStatistics = menuSummary(menu, byMenuAndDate)
      return menuSummaryRow(menu, users, byDate, menuStatistics, usersMenu)
    })
  )
)
