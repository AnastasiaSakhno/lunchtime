import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import RootBox from '../RootBox'
import Logout from '../Logout'

const Home = ({ logout, user, authenticated }) => (
  <div>
    <h3>Welcome { user ? user.email : 'You need to sign in.' }</h3>
    <Logout/>
    <RootBox/>
  </div>
)

const { object, bool, func } = PropTypes

Home.propTypes = {
  logout: func,
  user: object,
  authenticated: bool.isRequired
}

const mapStateToProps = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated
})

const mapDispatchToProps = (dispatch) => {
  logout: () => {
    dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
