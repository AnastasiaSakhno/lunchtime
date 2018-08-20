import React from 'react'
import {string, number, array} from 'prop-types'

const User = ({fullName, username, roles}) => (
  <tr>
    <td>{fullName}</td>
    <td>{username}</td>
    <td>{roles.join(', ')}</td>
  </tr>
)

User.propTypes = {
  id: number.isRequired,
  fullName: string.isRequired,
  username: string.isRequired,
  roles: array.isRequired
}

export default User
