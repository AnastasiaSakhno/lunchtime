import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sessionActions from '../../actions/auth'
import { Redirect } from 'react-router'
import HeaderHOC from '../../HOC/HeaderHOC'

@HeaderHOC
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
          <form className='login-form' onSubmit={ this.handleSubmit }>
            <div className="form-row align-items-center">
              <div className="col-auto">
                <label className="sr-only" htmlFor="email_input">Email</label>
                <input type='email' className="form-control mb-2" id="email_input" ref={ (el) => { this.emailInput = el } }/>
              </div>
              <div className="col-auto">
                <label className="sr-only" htmlFor="password_input">Password</label>
                <input type='password' className="form-control mb-2" id="password_input" ref={ (el) => { this.passwordInput = el } }/>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-2">Sign In</button>
              </div>
            </div>
          </form>
        </div>
    )
  }
}

const { object, bool, string } = PropTypes

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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
