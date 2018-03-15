import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MenuForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    restaurants: PropTypes.array.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const name = this.nameInput.value.trim()
    const restaurantLink = this.restaurantSelect.value
    if(!name || !restaurantLink) {
      return
    }

    const weekDays = this.weekDaysInput.value.trim()

    this.props.onSubmit({ name: name, week_days: weekDays, restaurant: restaurantLink, archive: false })

    this.weekDaysInput.value = this.nameInput.value = ''
  }

  render() {
    return (
      <div>
        <form className='menu-form' onSubmit={ this.handleSubmit }>
          <div className="form-row align-items-center">
            <div className="col-auto">
              <label className="sr-only" htmlFor="restaurant_input">Restaurant</label>
              <select className="custom-select mr-sm-2"
                id='restaurant_input'
                ref={ el => { this.restaurantSelect = el } }>
                <option>Select a Restaurant</option>
                { this.props.restaurants.map((restaurant) => (
                  <option
                    value={ restaurant._links.self.href }
                    key={ `restaurant-option_${restaurant.id}` }>{ restaurant.name }</option>
                )) }
              </select>
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="name_input">Name</label>
              <input type='text'
                className="form-control"
                id="name_input"
                placeholder='Name'
                ref={ el => { this.nameInput = el } }/>
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="week_days_input">Name</label>
              <input type='text'
                className="form-control"
                id='week_days_input'
                placeholder='Week days'
                ref={ el => { this.weekDaysInput = el } }/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mr-sm-2">Add menu</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default MenuForm
