import React, {Component} from 'react'
import {bool, string, func} from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'

import * as sessionActions from '../../actions/auth'
import withHeader from '../../HOC/withHeader'
import actions from '../../actions'

const defaultState = {
  email: null,
  fullName: null,
  password: null
}

@withHeader
class SignUp extends Component {
  static propTypes = {
    onSubmit: func.isRequired
  }

  state = defaultState

  handleChange = (e) => {
    const target = e.target
    this.setState({...this.state, [target.name]: target.value.trim()})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (!this.state.email || !this.state.fullName || !this.state.password) {
      return
    }

    this.props.onSubmit({...this.state})
  }

  render = () => (
    this.props.authenticated ?
      <Redirect to='/'/>
      :
      <div className='signup-box'>
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name_input'>Full name</label>
            <input
              name='fullName'
              type='name'
              className='form-control mb-2'
              id='name_input'
              onChange={this.handleChange}/>
          </div>
          <div className='form-group'>
            <label htmlFor='email_input'>Email</label>
            <input
              name='email'
              type='email'
              className='form-control mb-2'
              id='email_input'
              onChange={this.handleChange}/>
            <small id='emailHelp' className='form-text text-muted'>{this.props.error}</small>
          </div>
          <div className='form-group'>
            <label htmlFor='password_input'>Password</label>
            <input
              name='password'
              type='password'
              className='form-control mb-2'
              id='password_input'
              onChange={this.handleChange}/>
          </div>
          <button
            type='submit'
            className='btn btn-dark mb-2'
            disabled={!this.state.fullName || !this.state.email || !this.state.password}>
            Sign Up
          </button>
          <Link to='/login'>Sign In</Link>
        </form>
      </div>
  )
}

SignUp.propTypes = {
  authenticated: bool.isRequired,
  error: string
}

const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated,
  error: state.registrations.error
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (user) => {
    dispatch(actions.registrations.signup(user))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
