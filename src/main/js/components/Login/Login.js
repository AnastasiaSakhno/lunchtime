import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sessionActions from '../../actions/auth'

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
    return (
      <div className="login-box">
        <input type="email" placeholder="Email" ref={ (el) => { this.emailInput = el } }/>
        <input type="password" placeholder="Password" ref={ (el) => { this.passwordInput = el } }/>
        <input type="submit" value="Login" onClick={ this.handleSubmit }/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Login)
