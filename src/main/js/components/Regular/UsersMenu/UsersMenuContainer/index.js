import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../../actions/index'
import HeaderHOC from '../../../../HOC/HeaderHOC/index'
import RedirectToLoginHOC from '../../../../HOC/RedirectToLoginHOC/index'
import UsersMenuSheet from '../UsersMenuSheet'
import { groupBy, sortBy, compose, toLower, prop, filter, prepend } from 'ramda'

const { bool, array, object, func } = PropTypes

@HeaderHOC
@RedirectToLoginHOC
class UsersMenuContainer extends PureComponent {
  static propTypes = {
    loadMenu: func.isRequired,
    loadUsersMenu: func.isRequired,
    loadUsers: func.isRequired,
    addUserDayMenu: func.isRequired,
    updateUserDayMenu: func.isRequired,
    updateOut: func.isRequired,
    usersMenu: object.isRequired,
    menuList: array.isRequired,
    users: array.isRequired,
    authenticated: bool.isRequired,
    currentUser: object.isRequired
  }

  componentDidMount() {
    if(this.props.authenticated) {
      this.props.loadMenu()
      this.props.loadUsers()
      this.props.loadUsersMenu()
    }
  }

  render() {
    if(this.props.currentUser
      && this.props.usersMenu.data
      && this.props.menuList
      && this.props.users) {
      let groupedByUser = groupBy(udm => udm.user._links.self.href.replace('{?projection}', ''))(this.props.usersMenu.data)

      let orderedUsers = sortBy(compose(toLower, prop('fullName')))(this.props.users)
      orderedUsers = filter(u => u.id !== this.props.currentUser.id, orderedUsers)
      orderedUsers = prepend(this.props.currentUser, orderedUsers)

      return (
        <div className="users-menu-container">
          <UsersMenuSheet
            startDate={this.props.usersMenu.startDate}
            data={groupedByUser}
            onSubmit={this.props.addUserDayMenu}
            onUpdate={this.props.updateUserDayMenu}
            onOutUpdate={this.props.updateOut}
            menuList={this.props.menuList}
            currentUser={this.props.currentUser}
            users={orderedUsers}/>
        </div>
      )
    } else {
      return (
        <div>not yet</div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  menuList: state.menu,
  users: state.users,
  usersMenu: state.usersMenu,
  authenticated: state.session.authenticated,
  currentUser: state.users.find((u) => (u.email === state.session.user.email))
})

const mapDispatchToProps = (dispatch) => ({
  loadUsersMenu: () => {
    dispatch(actions.usersMenu.load())
  },
  loadMenu: () => {
    dispatch(actions.menu.load())
  },
  loadUsers: () => {
    dispatch(actions.users.load())
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
