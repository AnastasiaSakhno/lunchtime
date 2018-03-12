import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../../actions'
import { isEmpty } from '../../utils/object'

const withNeededStores = (neededStores) => (WrappedComponent) => {

  const { func, object, array } = PropTypes

  class NeededStoresWrapper extends Component {
    static propTypes = {
      usersMenu: object.isRequired,
      menu: array.isRequired,
      users: array.isRequired,
      loadMenu: func.isRequired,
      loadUsersMenu: func.isRequired,
      loadUsers: func.isRequired
    }

    componentDidMount() {
      if (this.props.authenticated) {
        // TODO eval all
        if(neededStores.includes('menu') && isEmpty(this.props.menu)) {
          this.props.loadMenu()
        }
        if(neededStores.includes('users') && isEmpty(this.props.menu)) {
          this.props.loadUsers()
        }
        if(neededStores.includes('usersMenu') && isEmpty(this.props.menu)) {
          this.props.loadUsersMenu()
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
    menu: state.menu,
    users: state.users,
    usersMenu: state.usersMenu
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
    }
  })

  return connect(mapStateToProps, mapDispatchToProps)(NeededStoresWrapper)
}

export default withNeededStores
