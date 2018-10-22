import {createSelector} from 'reselect'
import {groupBy, find} from 'ramda'

import {getMenu} from './menu'
import {dateMomentFromString, weekDateFormattedFromString} from '../utils/date'
import {href} from '../utils/object'
import sortBy from 'ramda/es/sortBy'

export const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
export const WEEK_DAYS_ABBREVIATIONS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
export const udmDateString = udm => udm.date
const udmDayOfWeekString = udm => WEEK_DAYS[dateMomentFromString(udm.date).isoWeekday() - 1]

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
  (data) => groupBy(udmDateString)(data)
)

export const groupedByWeekDay = createSelector(
  [getUsersMenuData],
  (data) => groupBy(udmDayOfWeekString)(data)
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

const menuDayOutCount = (arr) => arr ? arr.filter(udm => udm.out).length : 0

const menuSummaryRow = (menu, byDate, menuStatistics, usersMenu) => (
  WEEK_DAYS.map((day, index) => {
    let date = weekDateFormattedFromString(usersMenu.startDate, index + 1)
    let arr = menuStatistics ? menuStatistics.groupedByDate[date] : []
    let count = arr ? arr.length : 0
    let outCount = menuDayOutCount(arr)
    return {name: menu.name, colorHex: menu.colorHex, count: count, out: outCount}
  })
)

const menuSummary = (menu, byMenuAndDate) => byMenuAndDate.find(gmd => gmd.menu.href === href(menu))

export const orderedMenu = createSelector(
  [getMenu, groupedByMenu],
  (menuList, byMenu) => menuList.filter(m => byMenu[href(m)])
)

// export const summaryValues = createSelector(
//   [getUsersMenu, orderedMenu, groupedByMenuAndDate, groupedByDate],
//   (usersMenu, menuList, byMenuAndDate, byDate) => (
//     menuList.map(menu => {
//       let menuStatistics = menuSummary(menu, byMenuAndDate)
//       return menuSummaryRow(menu, byDate, menuStatistics, usersMenu)
//     })
//   )
// )


export const summaryValues = createSelector(
  [getMenu, groupedByWeekDay],
  (menuList, byWeekDay) => (
    WEEK_DAYS.map(wd => {
      const wdArr = byWeekDay[wd]
      // console.log(wd, byWeekDay, wdArr)
      let value = []
      if (wdArr) {
        const byMenu = groupBy(udm => udm.menu.id)(sortBy(udm => udm.menu.id)(wdArr))
        value = Object.keys(byMenu).map(mid => {
          const menu = find(m => m.id.toString() === mid.toString())(menuList)
          return (
            {
              name: menu.name,
              colorHex: menu.colorHex,
              count: byMenu[mid].length,
              out: byMenu[mid].filter(udm => udm.out).length
            })
        })
        // console.log('groupedByMenu=', groupedByMenu, value)
      }
      return value
    })
  )
)
