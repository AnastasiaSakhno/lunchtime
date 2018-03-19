import React from 'react'
import {string, bool, number, shape, func} from 'prop-types'

import MenuDestroyAction from '../MenuActions/MenuDestroyAction'
import archiveBranch from '../../../../HOC/branch/archiveBranch'
import ArchiveMenu from './ArchiveMenu'

const PureMenu = (props) => (
  <tr>
    <td>{props.restaurant.name}</td>
    <td>{props.name}</td>
    <td>{props.week_days ? props.week_days : 'All'}</td>
    <td><MenuDestroyAction {...props}/></td>
  </tr>
)

PureMenu.propTypes = {
  id: number,
  name: string.isRequired,
  week_days: string,
  restaurant: shape({
    id: number,
    name: string,
    archive: bool
  }),
  archive: bool.isRequired,
  onDestroy: func.isRequired
}

export default archiveBranch({
  ArchiveComponent: ArchiveMenu,
  NotArchiveComponent: PureMenu
})()
