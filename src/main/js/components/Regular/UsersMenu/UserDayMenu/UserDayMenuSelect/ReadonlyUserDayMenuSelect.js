import React from 'react'
import {string, number, array, shape} from 'prop-types'

const ReadonlyUserDayMenuSelect = ({menu, menuList}) => {
  let selected = menu ? menu._links.self.href.replace('{?projection}', '') : ''
  let selectedMenu = menuList.find((m) => (m._links.self.href === selected))
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
