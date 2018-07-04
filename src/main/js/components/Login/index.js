import React, {Component} from 'react'
import {object, func, bool, string} from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {GoogleLogin} from 'react-google-login'
import config from '../../config.json'

import withHeader from '../../HOC/withHeader'
import actions from '../../actions'
import {isTokenExpired} from '../../utils/rest'

@withHeader
class Login extends Component {
  static propTypes = {
    loginSuccess: func.isRequired,
    loginFailure: func.isRequired
  }

  render = () => (
    this.props.authenticated && !isTokenExpired(this.props.user.auth_token) ?
      <Redirect to='/'/>
      :
      <div className='login-box'>
        <a href="/auth/google">
          <i className='fa fa-google'/>
          <span> Login with Google</span>
        </a>
      </div>
  )
}

Login.propTypes = {
  user: object,
  authenticated: bool.isRequired,
  error: string
}

const mapStateToProps = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated,
  error: state.auth.error
})

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (data) => {
    dispatch(actions.auth.googleAuthSuccessfully(data))
  },
  loginFailure: (data) => {
    dispatch(actions.auth.googleAuthFailed(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
