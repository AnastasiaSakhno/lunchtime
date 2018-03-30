import React, {Component} from 'react'
import {string, array, object, func} from 'prop-types'
import cssModules from 'react-css-modules'

import {formattedDate, weekDateFormattedFromString} from '../../../../../utils/date'

import styles from './index.scss'
import UserWeekMenu from '../../UserWeekMenu/index'
import {href} from '../../../../../utils/object'
import {weekDays} from '../../../../../selectors/users_menu'
import DayStatus from '../DayStatus/index'

class UsersMenuSheetTable extends Component {
  render() {
    let map = this.props.orderedUsers.map((u) => {
      let found = this.props.dataGroupedByUser[href(u)]

      return (<UserWeekMenu
        key={`uwm_${this.props.startDate}_${u.id}`}
        startDate={this.props.startDate}
        onSubmit={this.props.onSubmit}
        onUpdate={this.props.onUpdate}
        onOutUpdate={this.props.onOutUpdate}
        menuList={this.props.menuList}
        activeMenu={this.props.activeMenu}
        days={this.props.days}
        user={u}
        data={found ? found : []}/>)
    })

    let headers = weekDays.map((day, index) => {
      let date = weekDateFormattedFromString(this.props.startDate, index + 1)
      let found = this.props.days.find(d => formattedDate(d.date) === date)
      return (
        <div key={`date_${day}`} className='col-2'>
          {date}
          <DayStatus
            id={found ? found.id : null}
            closed={found ? found.closed : false}
            days={this.props.days}
            date={date}
            onSubmit={this.props.onSubmitDay}
            onUpdate={this.props.onUpdateDay}/>
        </div>
      )
    })

    return (
      <div className="users-menu-sheet-table">
        <div className='row'>
          <div className='col-2'>User</div>
          {headers}
        </div>
        {map}
      </div>
    )
  }
}

UsersMenuSheetTable.propTypes = {
  startDate: string,
  dataGroupedByUser: object,
  days: array,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  onSubmitDay: func.isRequired,
  onUpdateDay: func.isRequired,
  onOutUpdate: func.isRequired,
  menuList: array.isRequired,
  activeMenu: array.isRequired,
  orderedUsers: array.isRequired
}

export default cssModules(UsersMenuSheetTable, styles)
