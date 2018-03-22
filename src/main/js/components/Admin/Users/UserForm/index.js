import React, {Component} from 'react'
import {func} from 'prop-types'

import cancanBranch from '../../../../HOC/branch/cancanBranch'
import {User} from '../../../abilities'

const defaultState = {
  email: null,
  fullName: null
}

class PureUserForm extends Component {
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

    if (!this.state.email || !this.state.fullName) {
      return
    }

    this.props.onSubmit({...this.state})

    this.setState(defaultState)
    e.target.reset()
  }

  render = () => (
    <div>
      <form className='user-form' onSubmit={this.handleSubmit}>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="name_input">Name</label>
            <input type='text'
              name='fullName'
              className="form-control"
              id="name_input"
              placeholder='Name'
              onChange={this.handleChange}/>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="email_input">Address</label>
            <input type='text'
              name='email'
              className="form-control"
              id='email_input'
              placeholder='Email'
              onChange={this.handleChange}/>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mr-sm-2">Add user</button>
          </div>
        </div>
      </form>
      <hr/>
    </div>
  )
}

export default cancanBranch({
  VerifiableClass: User,
  CanComponent: PureUserForm
})()
