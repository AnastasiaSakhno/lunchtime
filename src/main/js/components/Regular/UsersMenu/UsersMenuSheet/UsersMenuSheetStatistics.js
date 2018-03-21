import React from 'react'
import {string, array} from 'prop-types'
import moment from 'moment'
import {groupBy} from 'ramda'

const UsersMenuSheetStatistics = ({startDate, data, menuList}) => {
  let groupedByMenuLinks = groupBy(udm => udm.menu._links.self.href.replace('{?projection}', ''))(data)
  let groupedByMenuLinksAndDate = Object.entries(groupedByMenuLinks).map(entry => {
    const [menuHref, arr] = entry
    let groupedByDate = groupBy(udm => {
      return `${udm.date.year}-${('0' + udm.date.monthOfYear).slice(-2)}-${udm.date.dayOfMonth}`
    })(arr)
    return {menu: {href: menuHref}, groupedByDate: groupedByDate}
  })

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const headers = weekDays.map(day => {
    return <div scope="col" key={`total_${day}`} className='col-2'>{day}</div>
  })

  let weekStatistics = menuList.map(menu => {
    let menuStatistics = groupedByMenuLinksAndDate.find(gmd => gmd.menu.href === menu._links.self.href)
    let dayMenuStatistics = weekDays.map((day, index) => {
      let date = moment(startDate).day(index + 1).format('YYYY-MM-DD')
      let arr = menuStatistics ? menuStatistics.groupedByDate[date] : []
      return (
        <div className='col-2' key={`total_statistics_${menu.name}_${day}`}>
          {`${menu.name} ${arr ? arr.length : 0}`}
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
  menuList: array.isRequired
}

export default UsersMenuSheetStatistics
