import React from 'react'
import {string, number, bool, array, arrayOf, shape, func} from 'prop-types'

import UserDayMenu from '../UserDayMenu'
import {formattedDate, weekDateFormattedFromString} from '../../../../utils/date'
import {WEEK_DAYS_ABBREVIATIONS} from '../../../../selectors/users_menu'

const UserWeekMenu = (props) => (
  <div className='row users-menu-sheet-table-row'>
    <div className='col-2'>{props.user.fullName}</div>
    {[...Array(5).keys()].map((i) => {
      let dayOfWeek = i + 1
      let found = props.data.find((udm) => (
        udm.date === weekDateFormattedFromString(props.startDate, dayOfWeek)
      ))
      let key = `udm_${props.user.id}_${dayOfWeek}`
      if (!found) {
        found = {
          date: weekDateFormattedFromString(props.startDate, dayOfWeek)
        }
      }

      let day = props.days ? props.days.find(d => formattedDate(d.date) === found.date) : null
      let activeMenu = props.activeMenu.filter(
        m => !m.weekDays || m.weekDays.includes(WEEK_DAYS_ABBREVIATIONS[dayOfWeek - 1])
      )

      return (<UserDayMenu
        key={key}
        dayOfWeek={dayOfWeek}
        day={day}
        {...props}
        {...found}
        activeMenu={activeMenu}
        weekUdms={props.data}/>)
    })}
  </div>
)

UserWeekMenu.propTypes = {
  startDate: string,
  user: shape({
    id: number,
    fullName: string
  }).isRequired,
  data: arrayOf(
    shape({
      id: number,
      out: bool,
      date: string,
      archive: bool,
      menu: shape({
        id: number,
        name: string,
        colorHex: string
      })
    })
  ).isRequired,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  onChange: func.isRequired,
  onOutUpdate: func.isRequired,
  menuList: array.isRequired,
  activeMenu: array.isRequired,
  days: array.isRequired
}

export default UserWeekMenu
