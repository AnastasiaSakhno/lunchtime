import React, {Component} from 'react'
import {string, bool, number, shape, func} from 'prop-types'
import {SketchPicker} from 'react-color'

import MenuDestroyAction from '../MenuActions/MenuDestroyAction'
import archiveBranch from '../../../../HOC/branch/archiveBranch'
import ArchiveMenu from './ArchiveMenu'

class PureMenu extends Component {
  handleChange = (color) => {
    this.props.onColorUpdate({...this.props, colorHex: color.hex})
  }

  render = () => (
    <tr>
      <td>{this.props.restaurant ? this.props.restaurant.name : ''}</td>
      <td>{this.props.name}</td>
      <td>{this.props.weekDays ? this.props.weekDays : 'All'}</td>
      <td>
        <SketchPicker
          color={this.props.colorHex ? this.props.colorHex : '#FFFFFF'}
          onChangeComplete={this.handleChange}
        />
      </td>
      <td><MenuDestroyAction {...this.props}/></td>
    </tr>
  )
}

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
  colorHex: string,
  onDestroy: func.isRequired,
  onRestore: func.isRequired,
  onColorUpdate: func.isRequired
}

export default archiveBranch({
  ArchiveComponent: ArchiveMenu,
  NotArchiveComponent: PureMenu
})()
