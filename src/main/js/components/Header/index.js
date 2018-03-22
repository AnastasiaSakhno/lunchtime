import React from 'react'
import {bool} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import LogoutLink from '../LogoutLink'
import {UsersHeaderLink, MenuHeaderLink, MenuDocumentsHeaderLink, RestaurantsHeaderLink} from './HeaderLink'

const Header = ({authenticated}) => (
  <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Link className='navbar-brand' to='/'>Lunch time</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className='nav-link' to='/'>Home</Link>
          </li>
          <UsersHeaderLink url='/admin/users' name='Users'/>
          <RestaurantsHeaderLink url='/admin/restaurants' name='Restaurants'/>
          <MenuHeaderLink url='/admin/menu' name='Menu'/>
          <MenuDocumentsHeaderLink url='/admin/menu_documents' name='Menu documents'/>
          <li className="nav-item">
            {(authenticated) ? <LogoutLink/> : ''}
          </li>
        </ul>
        <form className="form-inline mt-2 mt-md-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <br/>
    <br/>
  </header>
)

Header.propTypes = {
  authenticated: bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated
})

export default connect(mapStateToProps)(Header)
