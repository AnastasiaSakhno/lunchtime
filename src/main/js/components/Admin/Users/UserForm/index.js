import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UserForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const email = this.emailInput.value.trim()
    const name = this.nameInput.value.trim()
    if(!email || !name) {
      return
    }

    this.props.onSubmit({ fullName: name, email: email, role: 'ROLE_REGULAR' })

    this.emailInput.value = this.nameInput.value = ''
  }

  render() {
    return (
      <div>
        <legend>User to add</legend>
        <form className='user-form' onSubmit={ this.handleSubmit }>
          <div className="form-row align-items-center">
            <div className="col-auto">
              <label className="sr-only" htmlFor="name_input">Name</label>
              <input type='text'
                className="form-control"
                id="name_input"
                placeholder='Name'
                ref={ el => { this.nameInput = el } }/>
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="email_input">Address</label>
              <input type='text'
                className="form-control"
                id='email_input'
                placeholder='Email'
                ref={ el => { this.emailInput = el } }/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mr-sm-2">Add user</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default UserForm
