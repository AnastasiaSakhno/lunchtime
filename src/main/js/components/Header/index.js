import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap'

import {UsersHeaderLink, MenuHeaderLink, MenuDocumentsHeaderLink, RestaurantsHeaderLink} from './HeaderLink'
import LogoutLink from '../LogoutLink'

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

  inactivateAllNavs = () => $('.nav-link.active').toggleClass('active')

  render = () => (
    <header>
      <Navbar color="dark" dark expand="md" fixed='top'>
        <NavbarBrand>
          <Link className='navbar-brand' to='/' onClick={this.inactivateAllNavs}>Lunch time</Link>
        </NavbarBrand>

        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UsersHeaderLink path='/admin/users' name='Users'/>
            <RestaurantsHeaderLink path='/admin/restaurants' name='Restaurants'/>
            <MenuHeaderLink path='/admin/menu' name='Menu'/>
            <MenuDocumentsHeaderLink path='/admin/menu_documents' name='Menu documents'/>
            <NavItem>
              <LogoutLink/>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <br/>
      <br/>
    </header>
  )
}

export default Header
