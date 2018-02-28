import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserDayMenu from '../UserDayMenu'

const { string, number, array, shape, func } = PropTypes

class UserWeekMenu extends Component {
  static propTypes = {
    onDestroy: func.isRequired,
    onSubmit: func.isRequired,
    menuList: array.isRequired
  }

  render() {
    return (
      <tr>
        { this.props.dayMenuList.map((dayMenu) => (
          <UserDayMenu { ...this.props } { ...dayMenu } />
        )) }
      </tr>
    )
  }
}

UserWeekMenu.propTypes = {
  dateStart: string.isRequired,
  user: shape({
    id: number,
    name: string
  }).isRequired,
  dayMenuList: array
}

export default UserWeekMenu
