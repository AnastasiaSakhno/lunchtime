import React from 'react'
import {string, bool, number, shape, func} from 'prop-types'

import MenuRestoreAction from '../MenuActions/MenuRestoreAction'

const ArchiveMenu = (props) => (
  <tr>
    <td>
      <del>{props.restaurant.name}</del>
    </td>
    <td>
      <del>{props.name}</del>
    </td>
    <td>
      <del>{props.weekDays ? props.weekDays : 'All'}</del>
    </td>
    <td><MenuRestoreAction {...props}/></td>
  </tr>
)

ArchiveMenu.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  weekDays: string,
  restaurant: shape({
    id: number,
    name: string,
    archive: bool
  }),
  onRestore: func.isRequired
}

export default ArchiveMenu
