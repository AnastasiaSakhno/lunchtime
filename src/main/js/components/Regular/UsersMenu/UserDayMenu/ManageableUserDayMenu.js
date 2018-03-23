import React from 'react'
import {string, bool, number, array, shape, func} from 'prop-types'

import ManageableUserDayMenuSelect from '../UserDayMenu/UserDayMenuSelect/ManageableUserDayMenuSelect'
import ManageableUserDayMenuOut from '../UserDayMenu/UserDayMenuOut/ManageableUserDayMenuOut'

const ManageableUserDayMenu = ({startDate, id, dayOfWeek, out, menu, user, menuList, onSubmit, onUpdate, onOutUpdate}) => (
  <div className='col-2'>
    <div className="user-day-menu_manageable input-group mb-3">
      <ManageableUserDayMenuSelect
        startDate={startDate}
        id={id}
        dayOfWeek={dayOfWeek}
        user={user}
        menu={menu}
        onSubmit={onSubmit}
        onUpdate={onUpdate}
        menuList={menuList}/>
      <ManageableUserDayMenuOut
        startDate={startDate}
        id={id}
        out={out}
        menu={menu}
        dayOfWeek={dayOfWeek}
        onOutUpdate={onOutUpdate}/>
    </div>
  </div>
)

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
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  onOutUpdate: func.isRequired,
  menuList: array.isRequired
}

export default ManageableUserDayMenu
