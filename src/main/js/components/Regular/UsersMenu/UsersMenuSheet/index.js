import React from 'react'
import PropTypes from 'prop-types'
import UserWeekMenu from '../UserWeekMenu'

const UsersMenuSheet = ({startDate, data, onSubmit, onUpdate, menuList, users}) => {
  let map = users.map((u) => {
    let found = data[u._links.self.href]

    return <UserWeekMenu
      key={`uwm_${startDate}_${u.id}`}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      menuList={menuList}
      user={u}
      data={found ? found : []}/>
  })

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const tableHeaders = weekDays.map((day) => (
    <th scope="col"key={day}>{day}</th>
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
  onUpdate: func.isRequired,
  users: array.isRequired
}

export default UsersMenuSheet
