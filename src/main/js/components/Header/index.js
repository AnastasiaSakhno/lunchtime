import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LogoutLink from '../LogoutLink'

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand" href="/">Lunch time</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                  aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/restaurants">Restaurants</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="/admin/menu">Menu</a>
              </li>
              <li className="nav-item">
                { (this.props.authenticated) ? <LogoutLink/> : '' }
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <hr/>
      </header>
    )
  }
}

const { object, bool } = PropTypes

Header.propTypes = {
  user: object,
  authenticated: bool.isRequired
}

const mapStateToProps = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated
})

export default connect(mapStateToProps)(Header)
