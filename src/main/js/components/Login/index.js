import React, {Component} from 'react'
import {object, bool, string} from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect} from 'react-router'

import * as sessionActions from '../../actions/auth'
import withHeader from '../../HOC/withHeader'

@withHeader
class Login extends Component {
  static propTypes = {
    actions: object.isRequired
  }

  state = {
    user: {
      email: '',
      password: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.actions.login({email: this.emailInput.value, password: this.passwordInput.value})
  }

  render = () => (
    this.props.authenticated ?
      <Redirect to='/'/>
      :
      <div className='login-box'>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email_input'>Email</label>
            <input type='email' className='form-control mb-2' id='email_input' ref={(el) => {
              this.emailInput = el
            }}/>
            <small id='emailHelp' className='form-text text-muted'>{this.props.error}</small>
          </div>
          <div className='form-group'>
            <label className='sr-only' htmlFor='password_input'>Password</label>
            <input type='password' className='form-control mb-2' id='password_input' ref={(el) => {
              this.passwordInput = el
            }}/>
          </div>
          <button type='submit' className='btn btn-primary mb-2'>Sign In</button>
        </form>
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
  actions: bindActionCreators(sessionActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
