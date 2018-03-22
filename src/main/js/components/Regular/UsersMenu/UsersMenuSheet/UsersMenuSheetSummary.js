import React from 'react'
import {array} from 'prop-types'

import selectors from '../../../../selectors'

const UsersMenuSheetSummary = ({summaryValues}) => {
  let weekSummary = summaryValues.map((menuSummary, index) => {
    let menuMap = menuSummary.map((menu, mindex) => (
      <div className='col-2' key={`summary_${menu.name}_${mindex}`}>
        {`${menu.name} ${menu.count}`}
      </div>
    ))
    return (
      <div className='row' key={`summary_row_${index}`}>
        <div className='col-2' key={`summary_col_${index}`}/>
        {menuMap}
      </div>
    )
  })

  const headers = selectors.usersMenu.weekDays.map(day => <div key={`summary_${day}`} className='col-2'>{day}</div>)

  return (
    <div className="users-menu-sheet-table users-menu-sheet-table-statistics">
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
