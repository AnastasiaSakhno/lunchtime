import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../../actions'
import withHeader from '../../../../HOC/withHeader'
import withCurrentUser from '../../../../HOC/withCurrentUser'
import UsersMenuSheet from '../UsersMenuSheet'
import withNeededStores from '../../../../HOC/withNeededStores'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'

const { func } = PropTypes

@withNeededStores(['menu', 'users', 'usersMenu'])
@withRedirectToLogin
@withCurrentUser
@withHeader
class UsersMenuContainer extends PureComponent {
  static propTypes = {
    addUserDayMenu: func.isRequired,
    updateUserDayMenu: func.isRequired,
    updateOut: func.isRequired
  }

  render() {
    return (
      <div className="users-menu-container">
        <UsersMenuSheet
          startDate={this.props.usersMenu.startDate}
          data={this.props.usersMenu.data}
          onSubmit={this.props.addUserDayMenu}
          onUpdate={this.props.updateUserDayMenu}
          onOutUpdate={this.props.updateOut}
          menuList={this.props.menu}
          currentUser={this.props.currentUser}
          users={this.props.users}/>
      </div>
    )
  }
}

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

export default connect(null, mapDispatchToProps)(UsersMenuContainer)
