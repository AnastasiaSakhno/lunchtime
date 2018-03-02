import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../../actions/index'
import HeaderHOC from '../../../../HOC/HeaderHOC/index'
import RedirectToLoginHOC from '../../../../HOC/RedirectToLoginHOC/index'
import UsersMenuSheet from '../UsersMenuSheet'
import { groupBy } from 'ramda'

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
    usersMenu: object.isRequired,
    menuList: array.isRequired,
    users: array.isRequired,
    authenticated: bool.isRequired
  }

  componentDidMount() {
    if(this.props.authenticated) {
      this.props.loadMenu()
      this.props.loadUsers()
      this.props.loadUsersMenu()
    }
  }

  render() {
    if(this.props.usersMenu.data && this.props.menuList && this.props.users) {
      let groupedByUser = groupBy(udm => udm.user._links.self.href.replace('{?projection}', ''))(this.props.usersMenu.data)

      return (
        <div className="users-menu-container">
          <UsersMenuSheet
            startDate={this.props.usersMenu.startDate}
            data={groupedByUser}
            onSubmit={this.props.addUserDayMenu}
            onUpdate={this.props.updateUserDayMenu}
            menuList={this.props.menuList}
            users={this.props.users}/>
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
  authenticated: state.session.authenticated
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersMenuContainer)
