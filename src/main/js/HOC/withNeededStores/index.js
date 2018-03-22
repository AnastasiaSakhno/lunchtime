import React, {Component} from 'react'
import {object, array, func} from 'prop-types'
import {connect} from 'react-redux'
import capitalize from 'capitalize'

import actions from '../../actions'
import { isEmpty } from '../../utils/object'

const withNeededStores = (neededStores) => (WrappedComponent) => {
  class NeededStoresWrapper extends Component {
    static propTypes = {
      usersMenu: object.isRequired,
      menu: array.isRequired,
      restaurants: array.isRequired,
      users: array.isRequired,
      menuDocuments: array.isRequired,
      loadMenu: func.isRequired,
      loadRestaurants: func.isRequired,
      loadUsersMenu: func.isRequired,
      loadUsers: func.isRequired,
      loadMenuDocuments: func.isRequired
    }

    componentDidMount() {
      let self = this
      neededStores.forEach((storeName) => {
        let store = eval(`self.props.${storeName}`)
        if (isEmpty(store)) {
          eval(`self.props.load${capitalize(storeName)}()`)
        }
      })
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
