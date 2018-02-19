import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MenuForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const weekDays = this.weekDaysInput.value.trim()
    if(!weekDays) {
      return
    }

    const name = this.nameInput.value.trim()
    const restaurantId = this.restaurantIdInput.value.trim()

    this.props.onSubmit({ name: name, week_days: weekDays, restaurant_id: restaurantId, archive: false })

    this.weekDaysInput.value = this.nameInput.value = ''
  }

  render() {
    return (
      <div>
        <legend>Menu to add</legend>
        <form className='restaurant-form' onSubmit={ this.handleSubmit }>
          <input type='text' placeholder='Restaurant' ref={ el => { this.restaurantIdInput = el } }/>
          <input type='text' placeholder='Name' ref={ el => { this.nameInput = el } }/>
          <input type='text' placeholder='Week days' ref={ el => { this.weekDaysInput = el } }/>
          <input type='submit' value='Add menu'/>
        </form>
      </div>
    )
  }
}

export default MenuForm
