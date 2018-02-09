import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sessionActions from '../../actions/auth'
import { Redirect } from 'react-router'

class Login extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      user: {
        email: '',
        password: ''
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.actions.login({ email: this.emailInput.value, password: this.passwordInput.value })
  }

  render() {
    let error = this.props.error ?
      <span className='help-block'>{ this.props.error.message }</span> : ''

    return (
      this.props.authenticated ?
        <Redirect to='/'/>
        :
        <div className='login-box'>
          <form className='form-horizontal'>
            <div className='control-group'>
              <label>Email</label>
              <div className='controls'>
                <input type='email' ref={ (el) => { this.emailInput = el } }/>
              </div>
              { error }
            </div>
            <div className='control-group'>
              <label>Password</label>
              <div className='controls'>
                <input type='password' ref={ (el) => { this.passwordInput = el } }/>
              </div>
            </div>
            <div className='control-group'>
              <div className='controls'>
                <input type='submit' value='Sign In' onClick={ this.handleSubmit }/>
              </div>
            </div>
          </form>
        </div>
    )
  }
}

const { object, bool } = PropTypes

Login.propTypes = {
  user: object,
  authenticated: bool.isRequired,
  error: object
}

const mapStateToProps = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated,
  error: state.auth.error
})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
