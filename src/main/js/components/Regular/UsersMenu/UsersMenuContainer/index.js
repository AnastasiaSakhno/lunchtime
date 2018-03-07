import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../../actions/index'
import HeaderHOC from '../../../../HOC/HeaderHOC/index'
import RedirectToLoginHOC from '../../../../HOC/RedirectToLoginHOC'
import UsersMenuSheet from '../UsersMenuSheet'

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
    currentUser: object
  }

  componentDidMount() {
    if(this.props.authenticated) {
      this.props.loadMenu()
      this.props.loadUsers()
      this.props.loadUsersMenu()
    }
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
          menuList={this.props.menuList}
          currentUser={this.props.currentUser}
          users={this.props.users}/>
      </div>
    )
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
