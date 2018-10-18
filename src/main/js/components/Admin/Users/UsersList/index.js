import React, {Component} from 'react'
import {string, number, bool, arrayOf, shape, array, func} from 'prop-types'

import {User} from '../../Users'
import withSpinner from '../../../../HOC/withSpinner'

@withSpinner(['users'])
class UsersList extends Component {
  render() {
    const map = this.props.users.map((user) => (
      <User
        {...user}
        key={`user_${user.id}`}
        authorities={this.props.authorities}
        onUpdate={this.props.onUpdate}
        onRolesUpdate={this.props.onRolesUpdate}/>
    ))

    return (
      <div className='user-list'>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Roles</th>
              <th scope="col">Enabled</th>
            </tr>
          </thead>
          <tbody>{map}</tbody>
        </table>
      </div>
    )
  }
}

UsersList.propTypes = {
  users: arrayOf(
    shape({
      id: number,
      fullName: string,
      username: string,
      roles: array,
      accountEnabled: bool
    })
  ).isRequired,
  authorities: array.isRequired,
  onUpdate: func.isRequired,
  onRolesUpdate: func.isRequired
}

export default UsersList
