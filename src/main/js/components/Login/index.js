import React, {Component} from 'react'
import {object, func, bool, string} from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'

import withHeader from '../../HOC/withHeader'
import actions from '../../actions'
import {isTokenExpired} from '../../utils/rest'

const defaultState = {
  email: null,
  password: null,
  rememberMe: false
}

@withHeader
class Login extends Component {
  static propTypes = {
    login: func.isRequired
  }

  state = defaultState

  handleChange = (e) => {
    const target = e.target
    this.setState({...this.state, [target.name]: target.value.trim()})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (!this.state.email || !this.state.password) {
      return
    }

    this.props.login({...this.state})
  }

  render = () => (
    this.props.authenticated && !isTokenExpired(this.props.user.auth_token) ?
      <Redirect to='/'/>
      :
      <div className='login-box'>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email_input'>Email</label>
            <input
              type='email'
              className='form-control mb-2'
              id='email_input'
              name='email'
              onChange={this.handleChange}/>
            <small id='emailHelp' className='form-text text-muted'>{this.props.error}</small>
          </div>
          <div className='form-group'>
            <label htmlFor='password_input'>Password</label>
            <input
              type='password'
              className='form-control mb-2'
              id='password_input'
              name='password'
              onChange={this.handleChange}/>
          </div>
          <button type='submit' className='btn btn-dark mb-2'>Sign In</button>
          <Link to='/signup'>Sign Up</Link>
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
  login: (user) => {
    dispatch(actions.auth.login(user))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
