import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import LogoutLink from '../LogoutLink'
import {Link} from 'react-router-dom'
import withCurrentUser from '../../HOC/withCurrentUser'
import {cancanUser, can, Menu, Restaurant, MenuDocument, User} from '../abilities'

@withCurrentUser
class Header extends Component {
  render() {
    const user = cancanUser(this.props.currentUser)

    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand" href="/">Lunch time</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className='nav-link' to='/'>Home</Link>
              </li>
              {
                can(user, 'view', User)
                  ? <li className="nav-item">
                    <Link className='nav-link' to='/admin/users'>Users</Link>
                  </li>
                  : ''
              }
              {
                can(user, 'view', Restaurant)
                  ? <li className="nav-item">
                    <Link className='nav-link' to='/admin/restaurants'>Restaurants</Link>
                  </li>
                  : ''
              }
              {
                can(user, 'view', Menu)
                  ? <li className="nav-item">
                    <Link className='nav-link' to='/admin/menu'>Menu</Link>
                  </li>
                  : ''
              }
              {
                can(user, 'view', MenuDocument)
                  ? <li className="nav-item">
                    <Link className='nav-link' to='/admin/menu_documents'>Menu documents</Link>
                  </li>
                  : ''
              }
              <li className="nav-item">
                {(this.props.authenticated) ? <LogoutLink/> : ''}
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
  }
}

const {object, bool} = PropTypes

Header.propTypes = {
  currentUser: object,
  authenticated: bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated
})

export default connect(mapStateToProps)(Header)
