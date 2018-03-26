import React, {Component} from 'react'
import {array, func} from 'prop-types'

import cancanBranch from '../../../../HOC/branch/cancanBranch'
import {Menu} from '../../../abilities'
import {href} from '../../../../utils/object'

const defaultState = {
  restaurant: null,
  name: null,
  weekDays: null,
  archive: false
}

class PureMenuForm extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    restaurants: array.isRequired
  }

  state = defaultState

  handleChange = (e) => {
    const target = e.target
    this.setState({...this.state, [target.name]: target.value.trim()})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (!this.state.name || !this.state.restaurant) {
      return
    }

    this.props.onSubmit({...this.state})

    this.setState(defaultState)
    e.target.reset()
  }

  render = () => (
    <div>
      <form className='menu-form' onSubmit={this.handleSubmit}>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="restaurant_input">Restaurant</label>
            <select name='restaurant' className="custom-select mr-sm-2"
              id='restaurant_input'
              onChange={this.handleChange}>
              <option>Select a Restaurant</option>
              {this.props.restaurants.map((restaurant) => (
                <option
                  value={href(restaurant)}
                  key={`restaurant-option_${restaurant.id}`}>{restaurant.name}</option>
              ))}
            </select>
          </div>
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
            <label className="sr-only" htmlFor="week_days_input">Name</label>
            <input type='text'
              name='weekDays'
              className="form-control"
              id='week_days_input'
              placeholder='Week days'
              onChange={this.handleChange}/>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-dark mr-sm-2">Add menu</button>
          </div>
        </div>
      </form>
      <hr/>
    </div>
  )
}

export default cancanBranch({
  VerifiableClass: Menu,
  CanComponent: PureMenuForm
})()
