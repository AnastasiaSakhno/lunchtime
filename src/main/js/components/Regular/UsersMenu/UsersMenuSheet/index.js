import React from 'react'
import PropTypes from 'prop-types'
import UserWeekMenu from '../UserWeekMenu'

const UsersMenuSheet = ({startDate, data, onSubmit, menuList, users}) => {
  let map = []
  $.each(data, (userId, usersMenu) => {
    // let user = users.find((u) => u.id === userId)
    let user = { id: Number.parseInt(userId), name: 'temp' }

    map.push(<UserWeekMenu
      key={`uwm_${startDate}_${userId}`}
      onSubmit={onSubmit}
      menuList={menuList}
      user={user}
      data={usersMenu}/>)
  })

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const tableHeaders = weekDays.map((day) => (
    <th scope="col">{day}</th>
  ))

  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-dark">
      <tr>
        <th scope="col">User</th>
        {tableHeaders}
      </tr>
      </thead>
      <tbody>{map}</tbody>
    </table>
  )
}

const {string, object, array, func} = PropTypes

UsersMenuSheet.propTypes = {
  startDate: string,
  data: object,
  onSubmit: func.isRequired,
  users: array.isRequired
}

export default UsersMenuSheet
