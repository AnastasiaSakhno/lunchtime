import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bool, string} from 'prop-types'

import {isTokenExpired} from '../../utils/rest'

const withRedirectToLogin = (WrappedComponent) => {
  class RedirectToLoginWrapper extends Component {
    static propTypes = {
      authenticated: bool.isRequired,
      token: string
    }

    constructor() {
      super()
      setInterval(() => {
        // we need wrapperRef in order to make sure that component was mounted
        if (this.refs.wrapperRef) {
          if(!this.props.authenticated || isTokenExpired(this.props.token)) {
            window.location.href = '/auth/google'
          }
        }
      }, 5000)
    }

    render = () =>
      (<div ref='wrapperRef'>
        <WrappedComponent {...this.props} />
      </div>)
  }

  const mapStateToProps = (state) => ({
    authenticated: state.session.authenticated,
    token: state.session.user.token
  })

  return connect(mapStateToProps)(RedirectToLoginWrapper)
}

export default withRedirectToLogin
