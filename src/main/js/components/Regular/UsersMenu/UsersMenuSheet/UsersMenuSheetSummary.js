import React from 'react'
import {array} from 'prop-types'

import selectors from '../../../../selectors'

const UsersMenuSheetSummary = ({summaryValues}) => {
  const menuSummaryView = (menu, index) => (
    <div
      className='col-2 users-menu-sheet-table-summary-item'
      key={`summary_${menu.name}_${index}`}>
      <div className='row'>
        <div
          className='col text-align-left'
          style={{backgroundColor: menu.colorHex ? menu.colorHex : '#f8f9fa'}}>
          {menu.name}
        </div>
        <div className='col'>{menu.count}</div>
        <div className='col'>{menu.out}</div>
      </div>
    </div>
  )

  const summaryRowView = (menuSummary, index) => {
    let menuMap = menuSummary.map((menu, mindex) => menuSummaryView(menu, mindex))
    return (
      <div className='row' key={`summary_row_${index}`}>
        <div className='col-2' key={`summary_col_${index}`}/>
        {menuMap}
      </div>
    )
  }

  let weekSummary = summaryValues.map((menuSummary, index) => summaryRowView(menuSummary, index))

  const headers = selectors.usersMenu.WEEK_DAYS.map(day =>
    (<div key={`summary_${day}`} className='col-2'>
      <div className='row text-white'>
        <div className='col-8'>{day}</div>
        <div className='col-4'>Out</div>
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
