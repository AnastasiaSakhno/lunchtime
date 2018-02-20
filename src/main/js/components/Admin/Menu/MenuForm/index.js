import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MenuForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    restaurants: PropTypes.array.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const weekDays = this.weekDaysInput.value.trim()
    if(!weekDays) {
      return
    }

    const name = this.nameInput.value.trim()
    const restaurantLink = this.restaurantSelect.value.trim()

    this.props.onSubmit({ name: name, week_days: weekDays, restaurant: restaurantLink, archive: false })

    this.weekDaysInput.value = this.nameInput.value = ''
  }

  render() {
    return (
      <div>
        <legend>Menu to add</legend>
        <form className='restaurant-form' onSubmit={ this.handleSubmit }>
          <select ref={ el => { this.restaurantSelect = el } }>
            <option>Select a Restaurant</option>
            { this.props.restaurants.map((restaurant) => (
              <option
                value={ restaurant._links.self.href }
                key={ `restaurant-option_${restaurant.id}` }>{ restaurant.name }</option>
            )) }
          </select>
          <input type='text' placeholder='Name' ref={ el => { this.nameInput = el } }/>
          <input type='text' placeholder='Week days' formNoValidate ref={ el => { this.weekDaysInput = el } }/>
          <input type='submit' value='Add menu'/>
        </form>
      </div>
    )
  }
}

export default MenuForm
