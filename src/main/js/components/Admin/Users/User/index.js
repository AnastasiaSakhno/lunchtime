import React, { Component } from 'react'
import PropTypes from 'prop-types'

class User extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired
  }

  render() {
    let text = `Name: ${ this.props.fullName }, Email: ${ this.props.email }, Role: ${ this.props.role }`

    return (
      <div className='user'>
        { text }
      </div>
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
