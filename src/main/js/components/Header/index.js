import React, {Component} from 'react'
import {bool, string, func} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap'

import {
  UsersHeaderLink, MenuHeaderLink, MenuDocumentsHeaderLink, RestaurantsHeaderLink,
  AuthBranched
} from './HeaderLink'
import actions from '../../actions'

const defaultState = {
  isOpen: false
}

class Header extends Component {
  state = defaultState

  toggle = () => {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    })
  }

  render = () => (
    <header>
      <Navbar color="dark" dark expand="md" fixed='top'>
        <NavbarBrand>
          <Link className='navbar-brand' to='/'>Lunch time</Link>
        </NavbarBrand>

        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UsersHeaderLink path='/admin/users' name='Users'/>
            <RestaurantsHeaderLink path='/admin/restaurants' name='Restaurants'/>
            <MenuHeaderLink path='/admin/menu' name='Menu'/>
            <MenuDocumentsHeaderLink path='/admin/menu_documents' name='Menu documents'/>
            <NavItem>
              <AuthBranched
                authenticated={this.props.authenticated}
                email={this.props.email}
                saveAuthData={this.props.saveAuthData}/>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <br/>
      <br/>
    </header>
  )
}

Header.propTypes = {
  authenticated: bool.isRequired,
  email: string,
  saveAuthData: func.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated,
  email: state.auth.email
})

const mapDispatchToProps = (dispatch) => ({
  saveAuthData: (authToken) => dispatch(actions.auth.saveAuthData(authToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
