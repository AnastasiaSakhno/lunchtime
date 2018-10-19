import React, {Component} from 'react'
import {string, number, bool, array, func} from 'prop-types'

import {href} from '../../../../utils/object'

class User extends Component {
  static propTypes = {
    authorities: array
  }

  handleRolesUpdate = (e) => {
    const authorities = Array.from(e.target.options)
      .filter(o => o.selected)
      .map(o => o.value)

    this.props.onRolesUpdate({id: this.props.id, authorities: authorities})
  }

  handleUpdate = (e) => {
    this.props.onUpdate({...this.props, accountEnabled: e.target.checked})
  }

  render = () => (
    <tr>
      <td>{this.props.fullName}</td>
      <td>{this.props.username}</td>
      <td>
        <select
          className='form-control custom-select user-roles-select'
          onChange={this.handleRolesUpdate} multiple size={this.props.authorities.length}>
          {this.props.authorities.map((auth) => (
            <option
              value={href(auth)}
              key={`auth-option_${auth.id}`}
              selected={this.props.roles.includes(auth.name)}>
              {auth.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          className='user-status-input'
          type='checkbox'
          checked={this.props.accountEnabled}
          onChange={this.handleUpdate}/>
      </td>
    </tr>
  )
}

User.propTypes = {
  id: number.isRequired,
  fullName: string.isRequired,
  username: string.isRequired,
  roles: array.isRequired,
  accountEnabled: bool.isRequired,
  onUpdate: func.isRequired,
  onRolesUpdate: func.isRequired
}

export default User
