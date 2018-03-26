import React from 'react'
import {string, number, array, shape} from 'prop-types'

import {href} from '../../../../../utils/object'

const ReadonlyUserDayMenuSelect = ({menu, menuList}) => {
  let selected = href(menu)
  let selectedMenu = menuList.find((m) => (href(m) === selected))
  let menuName = selectedMenu ? selectedMenu.name : ''

  return <div className='float-left'>{menuName}</div>
}

ReadonlyUserDayMenuSelect.propTypes = {
  menu: shape({
    id: number,
    name: string
  }),
  menuList: array.isRequired
}

export default ReadonlyUserDayMenuSelect
