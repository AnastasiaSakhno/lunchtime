import React from 'react'
import {array} from 'prop-types'

import selectors from '../../../../selectors'

const UsersMenuSheetSummary = ({summaryValues}) => {
  // console.log('summaryValues=', summaryValues)
  // const menuSummaryView = (menu, index) => (
  //   <div
  //     className='col-2 users-menu-sheet-table-summary-item'
  //     key={`summary_${menu.name}_${index}`}>
  //     {
  //       menu.count === 0 ?
  //         <div className='row'/>
  //         :
  //         <div className='row'>
  //           <div
  //             className='col-6 text-left'
  //             style={menu.colorHex ? {backgroundColor: menu.colorHex} : {}}>
  //             {menu.name}
  //           </div>
  //           <div className='col-3 text-center'>{menu.count}</div>
  //           <div className='col-3 text-center'>{menu.out}</div>
  //         </div>
  //     }
  //   </div>
  // )

  // const summaryRowView = (menuSummary, index) => {
  //   console.log(menuSummary, index)
  //   let menuMap = menuSummary.map((menu, mindex) => menuSummaryView(menu, mindex))
  //   return (
  //     <div className='row' key={`summary_row_${index}`}>
  //       <div className='col-2' key={`summary_col_${index}`}/>
  //       {menuMap}
  //     </div>
  //   )
  // }

  // let weekSummary = summaryValues.map((menuSummary, index) => summaryRowView(menuSummary, index))
  let weedDaysMenuMap = (rindex) => selectors.usersMenu.WEEK_DAYS.map((day, dindex) => {
    const daySummaryValues = summaryValues[dindex]
    const dayMenuSummary = daySummaryValues.length > rindex ? daySummaryValues[rindex] : null
    return (<div
      className='col-2 users-menu-sheet-table-summary-item'
      key={`summary_${day}_${rindex}`}>
      {
        dayMenuSummary ?
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
      }
    </div>)
  }
  )

  const selectedMenuCount = Math.max(...summaryValues.map(wd => wd.length))
  // console.log(Math.max(...summaryValues.map(wd => wd.length)), 'selectedMenuCount=', selectedMenuCount)
  let weekSummary = [...Array(selectedMenuCount).keys()].map((i) => {
    return (
      <div className='row' key={`summary_row_${i}`}>
        <div className='col-2' key={`summary_col_${i}`}/>
        {weedDaysMenuMap(i)}
      </div>
    )
  })
  // console.log('weekSummary=', weekSummary)


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
