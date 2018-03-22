import React, {PureComponent} from 'react'
import {object, array, func} from 'prop-types'
import {connect} from 'react-redux'

import actions from '../../../../actions'
import withHeader from '../../../../HOC/withHeader'
import UsersMenuSheet from '../UsersMenuSheet'
import withNeededStores from '../../../../HOC/withNeededStores'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import selectors from '../../../../selectors'

@withNeededStores(['menu', 'users', 'usersMenu'])
@withRedirectToLogin
@withHeader
class UsersMenuContainer extends PureComponent {
  static propTypes = {
    usersMenu: object,
    menu: array,
    addUserDayMenu: func.isRequired,
    updateUserDayMenu: func.isRequired,
    updateOut: func.isRequired,
    orderedUsers: array.isRequired,
    dataGroupedByUser: object,
    summaryValues: array
  }

  render = () => (
    <div className="users-menu-container">
      <UsersMenuSheet
        startDate={this.props.usersMenu.startDate}
        dataGroupedByUser={this.props.dataGroupedByUser}
        summaryValues={this.props.summaryValues}
        onSubmit={this.props.addUserDayMenu}
        onUpdate={this.props.updateUserDayMenu}
        onOutUpdate={this.props.updateOut}
        menuList={this.props.menu}
        orderedUsers={this.props.orderedUsers}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  orderedUsers: selectors.users.orderedUsers(state),
  dataGroupedByUser: selectors.usersMenu.groupedByUser(state),
  summaryValues: selectors.usersMenu.summaryValues(state)
})

const mapDispatchToProps = (dispatch) => ({
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
