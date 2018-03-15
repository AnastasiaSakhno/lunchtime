import React from 'react'
import PropTypes from 'prop-types'

import { Menu } from '../../Menu'

const MenuList = ({ data, onDestroy }) => {
  const map = data.map((menu) => (
    <Menu { ...menu } key={ `menu_${menu.id}` } onDestroy={ onDestroy } />
  ))

  return (
    <div className="menu-list">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Restaurant</th>
            <th scope="col">Name</th>
            <th scope="col">Week days</th>
            <th scope="col"/>
          </tr>
        </thead>
        <tbody>{map}</tbody>
      </table>
    </div>
  )
}

const { string, bool, number, object, arrayOf, shape, func } = PropTypes

MenuList.propTypes = {
  data: arrayOf(
    shape({
      id: number,
      name: string,
      week_days: string,
      restaurant: object,
      archive: bool
    })
  ).isRequired,
  onDestroy: func.isRequired
}

export default MenuList
