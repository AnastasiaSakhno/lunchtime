import React, {PureComponent} from 'react'
import {array, func} from 'prop-types'
import {connect} from 'react-redux'

import actions from '../../../../actions'
import {MenuList, MenuForm} from '../../Menu'
import withNeededStores from '../../../../HOC/withNeededStores'

@withNeededStores(['users', 'restaurants', 'menu'])
class MenuContainer extends PureComponent {
  static propTypes = {
    menu: array,
    restaurants: array,
    addMenu: func.isRequired,
    updateMenu: func.isRequired
  }

  render = () => (
    <div className="menu-container">
      <MenuForm onSubmit={this.props.addMenu} restaurants={this.props.restaurants}/>
      <MenuList
        data={this.props.menu}
        onUpdate={this.props.updateMenu}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addMenu: (menu) => dispatch(actions.menu.add(menu)),
  updateMenu: (menu) => dispatch(actions.menu.update(menu))
})

export default connect(null, mapDispatchToProps)(MenuContainer)
