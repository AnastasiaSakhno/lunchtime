import React, {PureComponent} from 'react'
import {object, array, func} from 'prop-types'
import {connect} from 'react-redux'
import moment from 'moment/moment'

import actions from '../../../../actions'
import withHeader from '../../../../HOC/withHeader'
import UsersMenuSheet from '../UsersMenuSheet'
import withNeededStores from '../../../../HOC/withNeededStores'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import UsersMenuPrevWeekLink from '../UsersMenuActions/UsersMenuPrevWeekLink'
import UsersMenuNextWeekLink from '../UsersMenuActions/UsersMenuNextWeekLink'
import UsersMenuDestroyButton from '../UsersMenuActions/UsersMenuDestroyButton'
import selectors from '../../../../selectors'

@withNeededStores(['menu', 'users'])
@withRedirectToLogin
@withHeader
class UsersMenuContainer extends PureComponent {
  static propTypes = {
    usersMenu: object.isRequired,
    days: object.isRequired,
    menu: array,
    activeMenu: array,
    addUserDayMenu: func.isRequired,
    updateUserDayMenu: func.isRequired,
    updateOut: func.isRequired,
    addDay: func.isRequired,
    updateDay: func.isRequired,
    orderedUsers: array.isRequired,
    dataGroupedByUser: object,
    summaryValues: array,
    loadUsersMenu: func.isRequired,
    loadDays: func.isRequired,
    destroyTillDate: func.isRequired
  }

  state = {
    startDate: moment().day(1)
  }

  componentDidMount() {
    this.props.loadUsersMenu(this.state.startDate)
    this.props.loadDays(this.state.startDate)
  }

  render = () => (
    <div className="users-menu-container">
      <UsersMenuPrevWeekLink startDate={this.state.startDate}/>
      <UsersMenuNextWeekLink startDate={this.state.startDate}/>
      <div className='float-right'>
        <UsersMenuDestroyButton startDate={this.state.startDate}/>
      </div>
      <UsersMenuSheet
        startDate={this.props.usersMenu.startDate}
        days={this.props.days.data}
        dataGroupedByUser={this.props.dataGroupedByUser}
        summaryValues={this.props.summaryValues}
        onSubmit={this.props.addUserDayMenu}
        onUpdate={this.props.updateUserDayMenu}
        onSubmitDay={this.props.addDay}
        onUpdateDay={this.props.updateDay}
        onOutUpdate={this.props.updateOut}
        menuList={this.props.menu}
        activeMenu={this.props.activeMenu}
        orderedUsers={this.props.orderedUsers}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  usersMenu: state.usersMenu,
  days: state.days,
  orderedUsers: selectors.users.orderedUsers(state),
  dataGroupedByUser: selectors.usersMenu.groupedByUser(state),
  summaryValues: selectors.usersMenu.summaryValues(state),
  activeMenu: selectors.menu.activeMenu(state)
})

const mapDispatchToProps = (dispatch) => ({
  loadUsersMenu: (startDate) => {
    dispatch(actions.usersMenu.load(startDate))
  },
  loadDays: (startDate) => {
    dispatch(actions.days.load(startDate))
  },
  addUserDayMenu: (userDayMenu) => {
    dispatch(actions.usersMenu.add(userDayMenu))
  },
  updateUserDayMenu: (userDayMenu) => {
    dispatch(actions.usersMenu.update(userDayMenu))
  },
  updateOut: (userDayMenu) => {
    dispatch(actions.usersMenu.updateOut(userDayMenu))
  },
  addDay: (day) => {
    dispatch(actions.days.add(day))
  },
  updateDay: (day) => {
    dispatch(actions.days.update(day))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersMenuContainer)
