import {createSelector} from 'reselect'
import {groupBy} from 'ramda'
import moment from 'moment/moment'

import {getMenu} from './menu'
import {getUsers} from './users'

export const dateString = udm => `${udm.date.year}-${('0' + udm.date.monthOfYear).slice(-2)}-${udm.date.dayOfMonth}`
export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export const getUsersMenu = (state) => state.usersMenu

const getUsersMenuData = (state) => state.usersMenu.data ? state.usersMenu.data : []

export const groupedByUser = createSelector(
  [getUsersMenuData],
  (data) => groupBy(udm => udm.user._links.self.href.replace('{?projection}', ''))(data)
)

export const groupedByMenu = createSelector(
  [getUsersMenuData],
  (data) => groupBy(udm => udm.menu._links.self.href.replace('{?projection}', ''))(data)
)

export const groupedByDate = createSelector(
  [getUsersMenuData],
  (data) => groupBy(dateString)(data.filter(udm => udm.menu.name !== 'None'))
)

export const groupedByMenuAndDate = createSelector(
  [groupedByMenu],
  (groupedByMenu) => (
    Object.entries(groupedByMenu).map(entry => {
      const [menuHref, arr] = entry
      let groupedByDate = groupBy(dateString)(arr)
      return {menu: {href: menuHref}, groupedByDate: groupedByDate}
    })
  )
)

const menuDayCount = (menu, date, users, byDate, arr) => {
  let count = arr ? arr.length : 0
  if (menu.name === 'None') {
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
    let date = moment(usersMenu.startDate).day(index + 1).format('YYYY-MM-DD')
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
