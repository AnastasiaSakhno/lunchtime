import React, {Component} from 'react'
import {string, number, array, func} from 'prop-types'

import {href} from '../../../../utils/object'

class User extends Component {
  static propTypes = {
    authorities: array
  }

  handleChange = (e) => {
    const authorities = Array.from(e.target.options)
      .filter(o => o.selected)
      .map(o => o.value)

    this.props.onChange({id: this.props.id, authorities: authorities})
  }

  render = () => (
    <tr>
      <td>{this.props.fullName}</td>
      <td>{this.props.username}</td>
      <td>
        <select
          className='form-control custom-select user-roles-select'
          onChange={this.handleChange} multiple size={this.props.authorities.length}>
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
    </tr>
  )
}

User.propTypes = {
  id: number.isRequired,
  fullName: string.isRequired,
  username: string.isRequired,
  roles: array.isRequired,
  onChange: func.isRequired
}

export default User
