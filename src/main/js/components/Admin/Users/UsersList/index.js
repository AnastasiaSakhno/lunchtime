import React, { Component } from 'react'
import { string, number, arrayOf, shape, array } from 'prop-types'

import { User } from '../../Users'
import withSpinner from '../../../../HOC/withSpinner'

@withSpinner(['data'])
class UsersList extends Component {
  render() {
    const map = this.props.data.map((user) => (
      <User {...user} key={`user_${user.id}`}/>
    ))

    return (
      <div className='user-list'>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>{map}</tbody>
        </table>
      </div>
    )
  }
}

UsersList.propTypes = {
  data: arrayOf(
    shape({
      id: number,
      fullName: string,
      username: string,
      roles: array
    })
  ).isRequired
}

export default UsersList
