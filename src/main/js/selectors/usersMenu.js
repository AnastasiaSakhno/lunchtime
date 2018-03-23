import {createSelector} from 'reselect'
import {groupBy} from 'ramda'

import {getMenu, NONE} from './menu'
import {getUsers} from './users'
import {weekDateFormattedFromString, formattedDate} from '../utils/date'

export const udmDateString = udm => formattedDate(udm.date)
export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export const getUsersMenu = (state) => state.usersMenu

const getUsersMenuData = (state) => state.usersMenu.data ? state.usersMenu.data : []

export const groupedByUser = createSelector(
  [getUsersMenuData],
  (data) => groupBy(udm => udm.user._links.self.href)(data)
)

export const groupedByMenu = createSelector(
  [getUsersMenuData],
  (data) => groupBy(udm => udm.menu._links.self.href)(data)
)

export const groupedByDate = createSelector(
  [getUsersMenuData],
  (data) => groupBy(udmDateString)(data.filter(udm => udm.menu.name !== NONE))
)

export const groupedByMenuAndDate = createSelector(
  [groupedByMenu],
  (groupedByMenu) => (
    Object.entries(groupedByMenu).map(entry => {
      const [menuHref, arr] = entry
      let groupedByDate = groupBy(udmDateString)(arr)
      return {menu: {href: menuHref}, groupedByDate: groupedByDate}
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
  weekDays.map((day, index) => {
    let date = weekDateFormattedFromString(usersMenu.startDate, index + 1)
    let arr = menuStatistics ? menuStatistics.groupedByDate[date] : []
    let count = menuDayCount(menu, date, users, byDate, arr)
    let outCount = menuDayOutCount(arr)
    return {name: menu.name, count: count, out: outCount}
  })
)

const menuSummary = (menu, byMenuAndDate) => byMenuAndDate.find(gmd => gmd.menu.href === menu._links.self.href)

export const summaryValues = createSelector(
  [getUsersMenu, getMenu, getUsers, groupedByMenuAndDate, groupedByDate],
  (usersMenu, menuList, users, byMenuAndDate, byDate) => (
    menuList.map(menu => {
      let menuStatistics = menuSummary(menu, byMenuAndDate)
      return menuSummaryRow(menu, users, byDate, menuStatistics, usersMenu)
    })
  )
)
