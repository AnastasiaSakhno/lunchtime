import React, {PureComponent} from 'react'
import {object, array, func} from 'prop-types'
import {connect} from 'react-redux'
import moment from 'moment/moment'

import actions from '../../../../actions'
import withHeader from '../../../../HOC/withHeader'
import UsersMenuSheet from '../UsersMenuSheet'
import withNeededStores from '../../../../HOC/withNeededStores'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import UsersMenuPrevWeekLink from '../UsersMenuLinks/UsersMenuPrevWeekLink'
import UsersMenuNextWeekLink from '../UsersMenuLinks/UsersMenuNextWeekLink'
import selectors from '../../../../selectors'

@withNeededStores(['menu', 'users'])
@withRedirectToLogin
@withHeader
class UsersMenuContainer extends PureComponent {
  static propTypes = {
    usersMenu: object.isRequired,
    menu: array,
    activeMenu: array,
    addUserDayMenu: func.isRequired,
    updateUserDayMenu: func.isRequired,
    updateOut: func.isRequired,
    orderedUsers: array.isRequired,
    dataGroupedByUser: object,
    summaryValues: array,
    loadUsersMenu: func.isRequired
  }

  state = {
    startDate: moment().day(1)
  }

  componentDidMount() {
    this.props.loadUsersMenu(this.state.startDate)
  }

  render = () => (
    <div className="users-menu-container">
      <UsersMenuPrevWeekLink startDate={this.state.startDate}/>
      <UsersMenuNextWeekLink startDate={this.state.startDate}/>
      <UsersMenuSheet
        startDate={this.props.usersMenu.startDate}
        dataGroupedByUser={this.props.dataGroupedByUser}
        summaryValues={this.props.summaryValues}
        onSubmit={this.props.addUserDayMenu}
        onUpdate={this.props.updateUserDayMenu}
        onOutUpdate={this.props.updateOut}
        menuList={this.props.menu}
        activeMenu={this.props.activeMenu}
        orderedUsers={this.props.orderedUsers}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  usersMenu: state.usersMenu,
  orderedUsers: selectors.users.orderedUsers(state),
  dataGroupedByUser: selectors.usersMenu.groupedByUser(state),
  summaryValues: selectors.usersMenu.summaryValues(state),
  activeMenu: selectors.menu.activeMenu(state)
})

const mapDispatchToProps = (dispatch) => ({
  loadUsersMenu: (startDate) => {
    dispatch(actions.usersMenu.load(startDate))
  },
  addUserDayMenu: (userDayMenu) => {
    dispatch(actions.usersMenu.add(userDayMenu))
  },
  updateUserDayMenu: (userDayMenu) => {
    dispatch(actions.usersMenu.update(userDayMenu))
  },
  updateOut: (userDayMenu) => {
    dispatch(actions.usersMenu.updateOut(userDayMenu))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersMenuContainer)
