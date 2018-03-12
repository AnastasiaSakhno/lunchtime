import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserWeekMenu from '../UserWeekMenu'
import moment from 'moment'
import SpinnerHOC from '../../../../HOC/SpinnerHOC'
import {compose, filter, groupBy, prepend, prop, sortBy, toLower} from 'ramda'

@SpinnerHOC(['startDate', 'currentUser', 'menuList'])
class UsersMenuSheet extends Component {
  render() {
    let groupedByUser = groupBy(udm => udm.user._links.self.href.replace('{?projection}', ''))(this.props.data)

    let orderedUsers = sortBy(compose(toLower, prop('fullName')))(this.props.users)
    orderedUsers = filter(u => u.id !== this.props.currentUser.id, orderedUsers)
    orderedUsers = prepend(this.props.currentUser, orderedUsers)

    let map = orderedUsers.map((u) => {
      let found = groupedByUser[u._links.self.href]

      return (<UserWeekMenu
        key={`uwm_${this.props.startDate}_${u.id}`}
        onSubmit={this.props.onSubmit}
        onUpdate={this.props.onUpdate}
        onOutUpdate={this.props.onOutUpdate}
        menuList={this.props.menuList}
        user={u}
        editable={this.props.currentUser.role === 'ROLE_ADMIN' || this.props.currentUser.id === u.id}
        data={found ? found : []}/>)
    })

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    const tableHeaders = weekDays.map((day, index) => {
      let date = moment(this.props.startDate).day(index + 1).format('YYYY-MM-DD')
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
}

const {string, object, array, func} = PropTypes

UsersMenuSheet.propTypes = {
  startDate: string,
  data: array,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  onOutUpdate: func.isRequired,
  menuList: array.isRequired,
  users: array.isRequired,
  currentUser: object
}

export default UsersMenuSheet
