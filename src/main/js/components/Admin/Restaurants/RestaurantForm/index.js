import React, {Component} from 'react'
import {func} from 'prop-types'

import cancanBranch from '../../../../HOC/branch/cancanBranch'
import {Restaurant} from '../../../abilities'

const defaultState = {
  name: null,
  address: null,
  archive: false
}

class PureRestaurantForm extends Component {
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

    if (!this.state.name || !this.state.address) {
      return
    }

    this.props.onSubmit({...this.state})

    this.setState(defaultState)
    e.target.reset()
  }

  render = () => (
    <div>
      <form className='restaurant-form' onSubmit={this.handleSubmit}>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="name_input">Name</label>
            <input type='text'
              name='name'
              className="form-control"
              id="name_input"
              placeholder='Name'
              onChange={this.handleChange}/>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="address_input">Address</label>
            <input type='text'
              name='address'
              className="form-control"
              id='address_input'
              placeholder='Address'
              onChange={this.handleChange}/>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-dark mr-sm-2">Add restaurant</button>
          </div>
        </div>
      </form>
      <hr/>
    </div>
  )
}

export default cancanBranch({
  VerifiableClass: Restaurant,
  CanComponent: PureRestaurantForm
})()
