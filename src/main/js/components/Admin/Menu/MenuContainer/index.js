import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../../../../actions'
import {MenuList, MenuForm} from '../../Menu'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import withCurrentUser from '../../../../HOC/withCurrentUser'
import withNeededStores from '../../../../HOC/withNeededStores'
import {cancanUser, can, Menu} from '../../../abilities'

const {array, func, object} = PropTypes

@withNeededStores(['restaurants', 'menu'])
@withRedirectToLogin
@withCurrentUser
@withHeader
class MenuContainer extends PureComponent {
  static propTypes = {
    menu: array,
    restaurants: array,
    currentUser: object,
    addMenu: func.isRequired,
    removeMenu: func.isRequired
  }

  render() {
    const user = cancanUser(this.props.currentUser)
    const menu = this.props.menu.map((menu) => (
      {
        ...menu,
        restaurant: this.props.restaurants.find((restaurant) => (
          restaurant.id === menu.restaurant_id
        ))
      }
    ))

    return (
      <div className="menu-container">
        {
          can(user, 'create', Menu)
            ? <MenuForm onSubmit={this.props.addMenu} restaurants={this.props.restaurants}/>
            : ''
        }
        <MenuList
          data={menu}
          onDestroy={this.props.removeMenu}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addMenu: (menu) => {
    dispatch(actions.menu.add(menu))
  },
  removeMenu: (menu) => {
    dispatch(actions.menu.remove(menu))
  }
})

export default connect(null, mapDispatchToProps)(MenuContainer)
