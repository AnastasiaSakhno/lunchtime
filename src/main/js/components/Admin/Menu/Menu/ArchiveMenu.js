import React from 'react'
import {string, bool, number, shape} from 'prop-types'

const ArchiveMenu = ({id, name, restaurant, weekDays}) => (
  <tr>
    <td>
      <del>{restaurant.name}</del>
    </td>
    <td>
      <del>{name}</del>
    </td>
    <td>
      <del>{weekDays ? weekDays : 'All'}</del>
    </td>
    <td/>
  </tr>
)

ArchiveMenu.propTypes = {
  id: number,
  name: string.isRequired,
  weekDays: string,
  restaurant: shape({
    id: number,
    name: string,
    archive: bool
  })
}

export default ArchiveMenu
