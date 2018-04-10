import React from 'react'
import {string, bool, number, array, object, shape, func} from 'prop-types'

import ManageableUserDayMenuSelect from '../UserDayMenu/UserDayMenuSelect/ManageableUserDayMenuSelect'
import ManageableUserDayMenuOut from '../UserDayMenu/UserDayMenuOut/ManageableUserDayMenuOut'
import {weekDays} from '../../../../selectors/users_menu'

const ManageableUserDayMenu =
  ({startDate, id, dayOfWeek, out, menu, user, activeMenu, onSubmit, onUpdate, onOutUpdate}) => {
    let dayOfWeekName = weekDays[dayOfWeek - 1].toLowerCase()

    return (<div className='col-2'>
      <div className={`user-day-menu_manageable input-group mb-3 user-day-menu-${dayOfWeekName}`}>
        <ManageableUserDayMenuSelect
          startDate={startDate}
          id={id}
          dayOfWeek={dayOfWeek}
          user={user}
          menu={menu}
          onSubmit={onSubmit}
          onUpdate={onUpdate}
          menuList={activeMenu}/>
        <ManageableUserDayMenuOut
          startDate={startDate}
          id={id}
          out={out}
          menu={menu}
          dayOfWeek={dayOfWeek}
          onOutUpdate={onOutUpdate}/>
      </div>
    </div>)
  }

ManageableUserDayMenu.propTypes = {
  startDate: string,
  id: number,
  dayOfWeek: number.isRequired,
  out: bool,
  menu: shape({
    id: number,
    name: string
  }),
  user: shape({
    id: number,
    fullName: string
  }).isRequired,
  day: object,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  onOutUpdate: func.isRequired,
  activeMenu: array.isRequired
}

export default ManageableUserDayMenu
