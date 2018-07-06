import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bool, string, object, func} from 'prop-types'
// import {Redirect} from 'react-router'

// import {isTokenExpired} from '../../utils/rest'
import actions from '../../actions'

const withRedirectToLogin = (WrappedComponent) => {
  class RedirectToLoginWrapper extends Component {
    static propTypes = {
      session: object,
      authenticated: bool.isRequired,
      token: string,
      checkAuth: func.isRequired
    }

    state = {
      tokenExpired: false
    }

    constructor() {
      super()
      setInterval(() => {
        this.props.checkAuth(this.props.session)
        // we need wrapperRef in order to make sure that component was mounted
        // if (this.refs.wrapperRef) {
        //   this.setState({
        //     ...this.state,
        //     tokenExpired: isTokenExpired(this.props.token)
        //   })
        // }
      }, 5000)
    }

    render = () =>
      (<div ref='wrapperRef'>
        <WrappedComponent {...this.props} />
      </div>)
  }

  const mapStateToProps = (state) => ({
    session: state.session,
    authenticated: state.session.authenticated,
    token: state.session.user.auth_token
  })

  const mapDispatchToProps = (dispatch) => ({
    checkAuth: (session) => dispatch(actions.auth.checkAuth(session))
  })

  return connect(mapStateToProps, mapDispatchToProps)(RedirectToLoginWrapper)
}

export default withRedirectToLogin
