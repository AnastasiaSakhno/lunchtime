import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UserWeekMenu from '../UserWeekMenu'
import moment from 'moment'
import withSpinner from '../../../../HOC/withSpinner'
import {compose, filter, groupBy, prepend, prop, sortBy, toLower} from 'ramda'

@withSpinner(['startDate', 'currentUser', 'menuList'])
class UsersMenuSheet extends Component {
  render() {
    let groupedByUser = groupBy(udm => udm.user._links.self.href.replace('{?projection}', ''))(this.props.data)

    let orderedUsers = sortBy(compose(toLower, prop('fullName')))(this.props.users)
    orderedUsers = filter(u => u.id !== this.props.currentUser.id, orderedUsers)
    orderedUsers = prepend(this.props.currentUser, orderedUsers)

    let dataMap = orderedUsers.map((u) => {
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

    let groupedByMenuNames = groupBy(udm => udm.menu.name)(this.props.data)
    let groupedByMenuNamesAndDate = Object.entries(groupedByMenuNames).map(entry => {
      const [menu, arr] = entry
      let groupedByDate = groupBy(udm => {
        return `${udm.date.year}-${('0' + udm.date.monthOfYear).slice(-2)}-${udm.date.dayOfMonth}`
      })(arr)
      return {menu: {name: menu}, groupedByDate: groupedByDate}
    })

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const totalHeaders = [], dataHeaders = []

    weekDays.forEach((day, index) => {
      let date = moment(this.props.startDate).day(index + 1).format('YYYY-MM-DD')
      totalHeaders.push(<th scope="col" key={`total_${day}`} className='col-2'>{day}</th>)
      dataHeaders.push(<th scope="col" key={`date_${day}`} className='col-2'>{date}</th>)
    })

    let totalWeekStatistics = this.props.menuList.map(menu => {
      let menuStatistics = groupedByMenuNamesAndDate.find(gmd => gmd.menu.name === menu.name)
      let dayMenuStatistics = weekDays.map((day, index) => {
        let date = moment(this.props.startDate).day(index + 1).format('YYYY-MM-DD')
        let arr = menuStatistics ? menuStatistics.groupedByDate[date] : []
        return <td className='col-2'>{`${menu.name} ${arr ? arr.length : 0}`}</td>
      })
      return (<tr className='row'>
        <td className='col-2'/>
        {dayMenuStatistics}
      </tr>)
    })

    return (
      <div className='users-menu-sheet'>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr className='row'>
              <th scope="col" className='col-2'/>
              {totalHeaders}
            </tr>
          </thead>
          <tbody>{totalWeekStatistics}</tbody>
        </table>
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr className='row'>
              <th scope="col" className='col-2'>User</th>
              {dataHeaders}
            </tr>
          </thead>
          <tbody>{dataMap}</tbody>
        </table>
      </div>
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
