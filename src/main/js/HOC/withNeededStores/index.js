import React, {Component} from 'react'
import {array, object, func} from 'prop-types'
import {connect} from 'react-redux'
import capitalize from 'capitalize'

import actions from '../../actions'
import { isEmpty } from '../../utils/object'

const withNeededStores = (neededStores) => (WrappedComponent) => {
  class NeededStoresWrapper extends Component {
    static propTypes = {
      config: object.isRequired,
      menu: array.isRequired,
      restaurants: array.isRequired,
      users: array.isRequired,
      menuDocuments: array.isRequired,
      loadConfig: func.isRequired,
      loadMenu: func.isRequired,
      loadRestaurants: func.isRequired,
      loadUsers: func.isRequired,
      loadAuthorities: func.isRequired,
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
    config: state.config,
    menu: state.menu,
    restaurants: state.restaurants,
    users: state.users,
    authorities: state.authorities,
    menuDocuments: state.menuDocuments
  })

  const mapDispatchToProps = (dispatch) => ({
    loadConfig: () => dispatch(actions.config.load()),
    loadMenu: () => dispatch(actions.menu.load()),
    loadRestaurants: () => dispatch(actions.restaurants.load()),
    loadUsers: () => dispatch(actions.users.load()),
    loadAuthorities: () => dispatch(actions.authorities.load()),
    loadMenuDocuments: () => dispatch(actions.menuDocuments.load())
  })

  return connect(mapStateToProps, mapDispatchToProps)(NeededStoresWrapper)
}

export default withNeededStores
