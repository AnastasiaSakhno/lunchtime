import React from 'react'
import {string, bool, number, array, shape} from 'prop-types'

import ReadonlyUserDayMenuSelect from '../UserDayMenu/UserDayMenuSelect/ReadonlyUserDayMenuSelect'
import ReadonlyUserDayMenuOut from '../UserDayMenu/UserDayMenuOut/ReadonlyUserDayMenuOut'

const ReadonlyUserDayMenu = ({menu, menuList, out}) => (
  <div className='user-day-menu_readonly'>
    <ReadonlyUserDayMenuSelect menu={menu} menuList={menuList}/>
    <ReadonlyUserDayMenuOut out={out}/>
  </div>
)

ReadonlyUserDayMenu.propTypes = {
  out: bool,
  menu: shape({
    id: number,
    name: string
  }),
  menuList: array.isRequired
}

export default ReadonlyUserDayMenu
