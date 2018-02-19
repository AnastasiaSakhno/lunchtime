import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../../actions/index'
import { MenuList, MenuForm } from '../../Menu'
import HeaderHOC from '../../../../HOC/HeaderHOC/index'
import RedirectToLoginHOC from '../../../../HOC/RedirectToLoginHOC/index'

const { bool, array, func } = PropTypes

@HeaderHOC
@RedirectToLoginHOC
class MenuContainer extends PureComponent {
  static propTypes = {
    loadMenu: func.isRequired,
    addMenu: func.isRequired,
    removeMenu: func.isRequired,
    menu: array.isRequired,
    authenticated: bool.isRequired
  }

  componentDidMount() {
    if(this.props.authenticated) {
      this.props.loadMenu()
    }
  }

  render() {
    return (
      <div className="menu-container">
        <MenuForm onSubmit={ this.props.addMenu }/>
        <MenuList
          data={ this.props.menu }
          onDestroy={ this.props.removeMenu } />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu,
  authenticated: state.session.authenticated
})

const mapDispatchToProps = (dispatch) => ({
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
