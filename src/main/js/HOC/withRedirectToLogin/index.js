import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bool} from 'prop-types'
import { Redirect } from 'react-router'

const withRedirectToLogin = (WrappedComponent) => {
  class RedirectToLoginWrapper extends Component {
    static propTypes = {
      authenticated: bool.isRequired
    }

    render() {
      return (
        this.props.authenticated ?
          <WrappedComponent {...this.props} />
          :
          <Redirect to='/login'/>
      )
    }
  }

  const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated
  })

  return connect(mapStateToProps)(RedirectToLoginWrapper)
}

export default withRedirectToLogin
