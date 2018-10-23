import React from 'react'
import {array} from 'prop-types'

import selectors from '../../../../selectors'

const UsersMenuSheetSummary = ({summaryValues}) => {
  const weekDayMenuSummaryView = (dayMenuSummary) => dayMenuSummary ?
    <div className='row'>
      <div
        className='col-6 text-left'
        style={dayMenuSummary.colorHex ? {backgroundColor: dayMenuSummary.colorHex} : {}}>
        {dayMenuSummary.name}
      </div>
      <div className='col-3 text-center'>{dayMenuSummary.count}</div>
      <div className='col-3 text-center'>{dayMenuSummary.out}</div>
    </div> :
    <div className='row'/>

  const weedDaysMenuSummaryMap = (mi) => selectors.usersMenu.WEEK_DAYS.map((day, di) => {
    const daySummaryValues = summaryValues[di]
    const dayMenuSummary = daySummaryValues.length > mi ? daySummaryValues[mi] : null
    return (<div
      className='col-2 users-menu-sheet-table-summary-item'
      key={`summary_${day}_${mi}`}>
      {weekDayMenuSummaryView(dayMenuSummary)}
    </div>)
  })

  const selectedMenuCount = Math.max(...summaryValues.map(wd => wd.length))

  const weekSummary = [...Array(selectedMenuCount).keys()].map((mi) =>
    (<div className='row' key={`summary_row_${mi}`}>
      <div className='col-2' key={`summary_col_${mi}`}/>
      {weedDaysMenuSummaryMap(mi)}
    </div>)
  )

  const headers = selectors.usersMenu.WEEK_DAYS.map(day =>
    (<div key={`summary_${day}`} className='col-2'>
      <div className='row text-white'>
        <div className='col-9'>{day}</div>
        <div className='col-3'>Out</div>
      </div>
    </div>)
  )

  return (
    <div className="users-menu-sheet-table users-menu-sheet-table-summary">
      <div className='row'>
        <div className='col-2'/>
        {headers}
      </div>
      {weekSummary}
    </div>
  )
}

UsersMenuSheetSummary.propTypes = {
  summaryValues: array
}

export default UsersMenuSheetSummary
