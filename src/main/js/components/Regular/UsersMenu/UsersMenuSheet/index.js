import React from 'react'
import PropTypes from 'prop-types'
import UserWeekMenu from '../UserWeekMenu'
import moment from 'moment'

const UsersMenuSheet = ({startDate, data, onSubmit, onUpdate, onOutUpdate, menuList, users, currentUser}) => {
  let map = users.map((u) => {
    let found = data[u._links.self.href]

    return (<UserWeekMenu
      key={`uwm_${startDate}_${u.id}`}
      onSubmit={onSubmit}
      onUpdate={onUpdate}
      onOutUpdate={onOutUpdate}
      menuList={menuList}
      user={u}
      editable={currentUser.role === 'ROLE_ADMIN' || currentUser.id === u.id}
      data={found ? found : []}/>)
  })

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const tableHeaders = weekDays.map((day, index) => {
    let date = moment(startDate).day(index + 1).format('YYYY-MM-DD')
    return <th scope="col" key={day}>{`${day}, ${date}`}</th>
  })

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
  onOutUpdate: func.isRequired,
  menuList: array.isRequired,
  users: array.isRequired,
  currentUser: object.isRequired
}

export default UsersMenuSheet
