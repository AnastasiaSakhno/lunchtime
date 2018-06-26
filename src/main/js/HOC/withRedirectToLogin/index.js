import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bool, string} from 'prop-types'
import {Redirect} from 'react-router'

import {isTokenExpired} from '../../utils/rest'

const withRedirectToLogin = (WrappedComponent) => {
  class RedirectToLoginWrapper extends Component {
    static propTypes = {
      authenticated: bool.isRequired,
      token: string
    }

    state = {
      tokenExpired: false
    }

    constructor() {
      super()
      setInterval(() => {
        // we need wrapperRef in order to make sure that component was mounted
        if (this.refs.wrapperRef) {
          this.setState({
            ...this.state,
            tokenExpired: isTokenExpired(this.props.token)
          })
        }
      }, 5000)
    }

    render = () =>
      this.props.authenticated && !this.state.tokenExpired ?
        <div ref='wrapperRef'>
          <WrappedComponent {...this.props} />
        </div>
        :
        <Redirect to='/login'/>
  }

  const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
    token: state.session.user.auth_token
  })

  return connect(mapStateToProps)(RedirectToLoginWrapper)
}

export default withRedirectToLogin
