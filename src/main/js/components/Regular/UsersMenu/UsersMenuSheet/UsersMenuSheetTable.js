import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UserWeekMenu from '../UserWeekMenu'
import moment from 'moment'
import {compose, filter, groupBy, prepend, prop, sortBy, toLower} from 'ramda'

class UsersMenuSheetTable extends Component {
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
        data={found ? found : []}/>)
    })

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    let headers = weekDays.map((day, index) => {
      let date = moment(this.props.startDate).day(index + 1).format('YYYY-MM-DD')
      return <th scope="col" key={`date_${day}`} className='col-2'>{date}</th>
    })

    return (
      <table className="table table-sm table-bordered table-hover">
        <thead className="thead-dark">
          <tr className='row'>
            <th scope="col" className='col-2'>User</th>
            {headers}
          </tr>
        </thead>
        <tbody>{map}</tbody>
      </table>
    )
  }
}

const {string, object, array, func} = PropTypes

UsersMenuSheetTable.propTypes = {
  startDate: string,
  data: array,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  onOutUpdate: func.isRequired,
  menuList: array.isRequired,
  users: array.isRequired,
  currentUser: object
}

export default UsersMenuSheetTable
