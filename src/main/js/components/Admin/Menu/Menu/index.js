import React from 'react'
import {string, bool, number, shape, func} from 'prop-types'

import MenuDestroyAction from '../MenuActions/MenuDestroyAction'
import archiveBranch from '../../../../HOC/branch/archiveBranch'
import ArchiveMenu from './ArchiveMenu'

const PureMenu = (props) => (
  <tr>
    <td>{props.restaurant ? props.restaurant.name : ''}</td>
    <td>{props.name}</td>
    <td>{props.weekDays ? props.weekDays : 'All'}</td>
    <td><MenuDestroyAction {...props}/></td>
  </tr>
)

PureMenu.propTypes = {
  id: number,
  name: string.isRequired,
  weekDays: string,
  restaurant: shape({
    id: number,
    name: string,
    archive: bool
  }),
  archive: bool.isRequired,
  onDestroy: func.isRequired,
  onRestore: func.isRequired
}

export default archiveBranch({
  ArchiveComponent: ArchiveMenu,
  NotArchiveComponent: PureMenu
})()
