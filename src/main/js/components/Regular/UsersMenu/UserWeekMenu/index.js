import React from 'react'
import {string, number, bool, object, array, arrayOf, shape, func} from 'prop-types'

import UserDayMenu from '../UserDayMenu'
import {formattedDate, weekDateJson} from '../../../../utils/date'

const UserWeekMenu = (props) => (
  <div className='row'>
    <div className='col-2'>{props.user.fullName}</div>
    {[...Array(5).keys()].map((i) => {
      let dayOfWeek = i + 1
      let found = props.data.find((udm) => (
        udm.date.dayOfWeek === dayOfWeek
      ))
      let key = `udm_${props.user.id}_${dayOfWeek}`
      if (!found) {
        found = {
          date: weekDateJson(props.startDate, dayOfWeek)
        }
      }

      let day = props.days.find(d => formattedDate(d.date) === formattedDate(found.date))

      return (<UserDayMenu key={key} dayOfWeek={dayOfWeek} day={day} {...props} {...found}/>)
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
      date: object,
      archive: bool,
      menu: shape({
        id: number,
        name: string
      })
    })
  ).isRequired,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  onOutUpdate: func.isRequired,
  menuList: array.isRequired,
  activeMenu: array.isRequired,
  days: array.isRequired
}

export default UserWeekMenu
