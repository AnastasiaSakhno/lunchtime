import React from 'react'
import {string, array} from 'prop-types'
import moment from 'moment'
import {groupBy} from 'ramda'

const UsersMenuSheetStatistics = ({startDate, data, menuList, users}) => {
  const dateString = udm => `${udm.date.year}-${('0' + udm.date.monthOfYear).slice(-2)}-${udm.date.dayOfMonth}`

  let groupedByMenuLinks = groupBy(udm => udm.menu._links.self.href.replace('{?projection}', ''))(data)
  let groupedByMenuLinksAndDate = Object.entries(groupedByMenuLinks).map(entry => {
    const [menuHref, arr] = entry
    let groupedByDate = groupBy(dateString)(arr)
    return {menu: {href: menuHref}, groupedByDate: groupedByDate}
  })

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const headers = weekDays.map(day => {
    return <div key={`total_${day}`} className='col-2'>{day}</div>
  })

  let groupedByDate = groupBy(dateString)(data.filter(udm => udm.menu.name !== 'None'))
  let weekStatistics = menuList.map(menu => {
    let menuStatistics = groupedByMenuLinksAndDate.find(gmd => gmd.menu.href === menu._links.self.href)
    let dayMenuStatistics = weekDays.map((day, index) => {
      let date = moment(startDate).day(index + 1).format('YYYY-MM-DD')
      let arr = menuStatistics ? menuStatistics.groupedByDate[date] : []
      let count = arr ? arr.length : 0
      if (menu.name === 'None') {
        count = users.length
        let totalDateArr = groupedByDate[date]
        if (totalDateArr) {
          count = count - totalDateArr.length
        }
      }
      return (
        <div className='col-2' key={`total_statistics_${menu.name}_${day}`}>
          {`${menu.name} ${count}`}
        </div>
      )
    })
    return (
      <div className='row' key={`total_statistics_row_${menu.name}`}>
        <div className='col-2' key={`total_statistics_col_${menu.name}`}/>
        {dayMenuStatistics}
      </div>
    )
  })

  return (
    <div className="users-menu-sheet-table users-menu-sheet-table-statistics">
      <div className='row'>
        <div className='col-2'/>
        {headers}
      </div>
      {weekStatistics}
    </div>
  )
}

UsersMenuSheetStatistics.propTypes = {
  startDate: string,
  data: array,
  menuList: array.isRequired,
  users: array.isRequired
}

export default UsersMenuSheetStatistics
