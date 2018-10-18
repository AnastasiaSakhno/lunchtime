import React from 'react'
import PropTypes from 'prop-types'

import {Menu} from '../../Menu'

const MenuList = ({data, onUpdate}) => {
  const map = data.map((menu) => (
    <Menu
      {...menu}
      key={`menu_${menu.id}`}
      onDestroy={(m) => onUpdate({...m, archive: true})}
      onRestore={(m) => onUpdate({...m, archive: false})}
      onColorUpdate={onUpdate}/>
  ))

  return (
    <div className="menu-list">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Restaurant</th>
            <th scope="col">Name</th>
            <th scope="col">Week days</th>
            <th scope="col">Color</th>
            <th scope="col"/>
          </tr>
        </thead>
        <tbody>{map}</tbody>
      </table>
    </div>
  )
}

const {string, bool, number, object, arrayOf, shape, func} = PropTypes

MenuList.propTypes = {
  data: arrayOf(
    shape({
      id: number,
      name: string,
      weekDays: string,
      restaurant: object,
      archive: bool,
      colorHex: string
    })
  ).isRequired,
  onUpdate: func.isRequired
}

export default MenuList
