import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RootBox from '../RootBox'
import LogoutButton from '../Logout'
import { Redirect } from 'react-router'

class Home extends Component {
  render() {
    return (
      this.props.authenticated ?
        <div className='home'>
          <h3>Welcome, { this.props.user.email }</h3>
          <LogoutButton/>
          <hr/>
          <RootBox/>
        </div>
        :
        <Redirect to='/login'/>
    )
  }
}

const { object, bool } = PropTypes

Home.propTypes = {
  user: object,
  authenticated: bool.isRequired
}

const mapStateToProps = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated
})

export default connect(mapStateToProps)(Home)
