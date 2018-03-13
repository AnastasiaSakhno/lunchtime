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
      restaurants: array.isRequired,
      users: array.isRequired,
      loadMenu: func.isRequired,
      loadRestaurants: func.isRequired,
      loadUsersMenu: func.isRequired,
      loadUsers: func.isRequired,
      loadMenuDocuments: func.isRequired
    }

    componentDidMount() {
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
      if(neededStores.includes('restaurants') && isEmpty(this.props.restaurants)) {
        this.props.loadRestaurants()
      }
      if(neededStores.includes('menuDocuments') && isEmpty(this.props.menuDocuments)) {
        this.props.loadMenuDocuments()
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    menu: state.menu,
    restaurants: state.restaurants,
    users: state.users,
    usersMenu: state.usersMenu,
    menuDocuments: state.menuDocuments
  })

  const mapDispatchToProps = (dispatch) => ({
    loadUsersMenu: () => {
      dispatch(actions.usersMenu.load())
    },
    loadMenu: () => {
      dispatch(actions.menu.load())
    },
    loadRestaurants: () => {
      dispatch(actions.restaurants.load())
    },
    loadUsers: () => {
      dispatch(actions.users.load())
    },
    loadMenuDocuments: () => {
      dispatch(actions.menuDocuments.load())
    }
  })

  return connect(mapStateToProps, mapDispatchToProps)(NeededStoresWrapper)
}

export default withNeededStores
