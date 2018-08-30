import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bool, string, object, func} from 'prop-types'

import {isTokenExpired} from '../../utils/rest'
import selectors from '../../selectors'
import actions from '../../actions'

const withRedirectToLogin = (WrappedComponent) => {
  class RedirectToLoginWrapper extends Component {
    static propTypes = {
      authenticated: bool.isRequired,
      token: string,
      currentUser: object,
      alertChanged: func.isRequired
    }

    constructor() {
      super()
      setInterval(() => {
        // we need wrapperRef in order to make sure that component was mounted
        if (this.refs.wrapperRef) {
          if(!this.props.currentUser
            || !this.props.authenticated
            || isTokenExpired(this.props.token)) {
            this.props.alertChanged({warning: 'Not authenticated or token is expired'})
            window.location.href = '/auth/google'
          }
        }
      }, 1000)
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

  const mapDispatchToProps = (dispatch) => ({
    alertChanged: (alert) => dispatch(actions.alerts.alertChanged(alert)),
  })

  return connect(mapStateToProps, mapDispatchToProps)(RedirectToLoginWrapper)
}

export default withRedirectToLogin
