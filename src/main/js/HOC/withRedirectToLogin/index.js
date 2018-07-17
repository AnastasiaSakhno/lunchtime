import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bool, string, object} from 'prop-types'

import {isTokenExpired} from '../../utils/rest'
import selectors from '../../selectors'

const withRedirectToLogin = (WrappedComponent) => {
  class RedirectToLoginWrapper extends Component {
    static propTypes = {
      authenticated: bool.isRequired,
      token: string,
      currentUser: object
    }

    constructor() {
      super()
      setInterval(() => {
        // we need wrapperRef in order to make sure that component was mounted
        if (this.refs.wrapperRef) {
          if(!this.props.currentUser
            || !this.props.authenticated
            || isTokenExpired(this.props.token)) {
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
    token: state.session.user.token,
    currentUser: selectors.auth.getCurrentUser(state)
  })

  return connect(mapStateToProps)(RedirectToLoginWrapper)
}

export default withRedirectToLogin
