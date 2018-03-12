import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

const withRedirectToLogin = (WrappedComponent) => {
  return class HeaderWrapper extends Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired
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
}

export default withRedirectToLogin
