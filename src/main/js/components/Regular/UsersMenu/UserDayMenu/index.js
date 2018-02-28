import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../../IconButton/index'

const { string, bool, number, array, shape, func } = PropTypes

class UserDayMenu extends Component {
  static propTypes = {
    onDestroy: func.isRequired,
    onSubmit: func.isRequired,
    menuList: array.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // TODO update or destroy
    this.props.onSubmit({ ...this.props })
  }

  render() {
    return (
      <td>
        <select className="custom-select mr-sm-2"
          ref={ el => { this.menuSelect = el } } onChange={ this.handleSubmit }>
          <option>Select a Restaurant</option>
          { this.props.menuList.map((menu) => (
            <option
              value={ menu._links.self.href }
              key={ `menu-option_${menu.id}` }>{ menu.name }</option>
          )) }
        </select>
      </td>
    )
  }
}

UserDayMenu.propTypes = {
  id: number,
  date: string.isRequired,
  out: bool,
  archive: bool,
  menu: shape({
    id: number,
    name: string
  }),
  user: shape({
    id: number,
    name: string
  }).isRequired
}

export default UserDayMenu
