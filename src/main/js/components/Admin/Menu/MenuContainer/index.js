import React, {PureComponent} from 'react'
import {array, func, object} from 'prop-types'
import {connect} from 'react-redux'

import actions from '../../../../actions'
import {MenuList, MenuForm} from '../../Menu'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import withCurrentUser from '../../../../HOC/withCurrentUser'
import withNeededStores from '../../../../HOC/withNeededStores'

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

  render = () => (
    <div className="menu-container">
      <MenuForm onSubmit={this.props.addMenu} restaurants={this.props.restaurants}/>
      <MenuList
        data={this.props.menu}
        onDestroy={this.props.removeMenu}/>
    </div>
  )
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
