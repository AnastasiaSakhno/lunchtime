import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { User } from '../../Users'
import withSpinner from "../../../../HOC/withSpinner";

@withSpinner(['data'])
class UsersList extends Component {
  render() {
    const map = this.props.data.map((user) => (
      <User {...user} key={`user_${user.id}`}/>
    ))

    return (
      <div className="users-list">
        {map}
      </div>
    )
  }
}

const { string, number, arrayOf, shape } = PropTypes

UsersList.propTypes = {
  data: arrayOf(
    shape({
      id: number,
      fullName: string,
      email: string,
      role: string
    })
  ).isRequired
}

export default UsersList
