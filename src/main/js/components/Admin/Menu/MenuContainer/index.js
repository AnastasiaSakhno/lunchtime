import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../../../../actions'
import {MenuList, MenuForm} from '../../Menu'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import withCurrentUser from '../../../../HOC/withCurrentUser'
import {cancanUser, can, Menu} from '../../../abilities'

const {bool, array, func} = PropTypes

@withHeader
@withRedirectToLogin
@withCurrentUser
class MenuContainer extends PureComponent {
  static propTypes = {
    loadRestaurants: func.isRequired,
    loadMenu: func.isRequired,
    addMenu: func.isRequired,
    removeMenu: func.isRequired,
    menu: array.isRequired,
    restaurants: array.isRequired,
    authenticated: bool.isRequired
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.loadRestaurants()
      this.props.loadMenu()
    }
  }

  render() {
    const user = cancanUser(this.props.currentUser)

    return (
      <div className="menu-container">
        {
          can(user, 'create', Menu)
            ? <MenuForm onSubmit={this.props.addMenu} restaurants={this.props.restaurants}/>
            : ''
        }
        <MenuList
          data={this.props.menu}
          onDestroy={this.props.removeMenu}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu.map((menu) => (
    {
      ...menu,
      restaurant: state.restaurants.find((restaurant) => (
        restaurant.id === menu.restaurant_id
      ))
    }
  )),
  restaurants: state.restaurants,
  authenticated: state.session.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  loadRestaurants: () => {
    dispatch(actions.restaurants.load())
  },
  loadMenu: () => {
    dispatch(actions.menu.load())
  },
  addMenu: (menu) => {
    dispatch(actions.menu.add(menu))
  },
  removeMenu: (menu) => {
    dispatch(actions.menu.remove(menu))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
