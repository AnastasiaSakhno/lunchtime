import React, {Component} from 'react'
import {bool} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap'

import LogoutLink from '../LogoutLink'
import {UsersHeaderLink, MenuHeaderLink, MenuDocumentsHeaderLink, RestaurantsHeaderLink} from './HeaderLink'

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
            {this.props.authenticated ? <NavItem><LogoutLink/></NavItem> : ''}
          </Nav>
        </Collapse>
      </Navbar>
      <br/>
      <br/>
    </header>
  )
}

Header.propTypes = {
  authenticated: bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated
})

export default connect(mapStateToProps)(Header)
