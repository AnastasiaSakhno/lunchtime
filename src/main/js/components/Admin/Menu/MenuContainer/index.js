import React, {PureComponent} from 'react'
import {array, func} from 'prop-types'
import {connect} from 'react-redux'

import actions from '../../../../actions'
import {MenuList, MenuForm} from '../../Menu'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import withNeededStores from '../../../../HOC/withNeededStores'

@withNeededStores(['restaurants', 'menu'])
@withRedirectToLogin
class MenuContainer extends PureComponent {
  static propTypes = {
    menu: array,
    restaurants: array,
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
