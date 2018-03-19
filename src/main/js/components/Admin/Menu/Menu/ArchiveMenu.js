import React from 'react'
import {string, bool, number, shape} from 'prop-types'

const ArchiveMenu = ({id, name, restaurant, week_days}) => (
  <tr>
    <td>
      <del>{restaurant.name}</del>
    </td>
    <td>
      <del>{name}</del>
    </td>
    <td>
      <del>{week_days ? week_days : 'All'}</del>
    </td>
    <td/>
  </tr>
)

ArchiveMenu.propTypes = {
  id: number,
  name: string.isRequired,
  week_days: string,
  restaurant: shape({
    id: number,
    name: string,
    archive: bool
  })
}

export default ArchiveMenu
