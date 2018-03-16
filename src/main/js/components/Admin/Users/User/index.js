import React, { Component } from 'react'
import PropTypes from 'prop-types'

class User extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired
  }

  render() {
    return (
      <tr>
        <td>{this.props.fullName}</td>
        <td>{this.props.email}</td>
        <td>{this.props.role}</td>
      </tr>
    )
  }
}

const { string, number } = PropTypes

User.propTypes = {
  id: number.isRequired,
  fullName: string.isRequired,
  email: string.isRequired,
  role: string.isRequired
}

export default User
