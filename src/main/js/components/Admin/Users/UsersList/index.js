import React, {Component} from 'react'
import {string, number, arrayOf, shape, array, func} from 'prop-types'

import {User} from '../../Users'
import withSpinner from '../../../../HOC/withSpinner'

@withSpinner(['users'])
class UsersList extends Component {
  render() {
    const map = this.props.users.map((user) => (
      <User {...user} key={`user_${user.id}`} authorities={this.props.authorities} onChange={this.props.onChange}/>
    ))

    return (
      <div className='user-list'>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Roles</th>
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
      roles: array
    })
  ).isRequired,
  authorities: array.isRequired,
  onChange: func.isRequired
}

export default UsersList
