import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../../actions/index'
import HeaderHOC from '../../../../HOC/HeaderHOC/index'
import RedirectToLoginHOC from '../../../../HOC/RedirectToLoginHOC/index'
import UsersMenuSheet from '../UsersMenuSheet'

const { bool, array, func } = PropTypes

@HeaderHOC
@RedirectToLoginHOC
class UsersMenuContainer extends PureComponent {
  static propTypes = {
    loadMenu: func.isRequired,
    loadUsersMenu: func.isRequired,
    menuList: array.isRequired,
    authenticated: bool.isRequired
  }

  componentDidMount() {
    if(this.props.authenticated) {
      this.props.loadMenu()
      this.props.loadUsersMenu()
    }
  }

  render() {
    const map = this.props.usersMenu.map((usersMenuSheet) => (
      <UsersMenuSheet dateStart={ usersMenuSheet.dateStart } data={ usersMenuSheet.data } onSubmit={ this.props.submitUserMenu }/>
    ))

    return (
      <div className="users-menu-container">
        { map }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  menuList: state.menu,
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
  submitUserMenu: (userDayMenu) => {
    dispatch(actions.usersMenu.submit(userDayMenu))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersMenuContainer)
