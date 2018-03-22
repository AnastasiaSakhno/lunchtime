import React from 'react'
import {string, number} from 'prop-types'

const User = ({fullName, email, role}) => (
  <tr>
    <td>{fullName}</td>
    <td>{email}</td>
    <td>{role}</td>
  </tr>
)

User.propTypes = {
  id: number.isRequired,
  fullName: string.isRequired,
  email: string.isRequired,
  role: string.isRequired
}

export default User
