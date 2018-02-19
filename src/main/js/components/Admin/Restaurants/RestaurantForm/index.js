import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RestaurantForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const address = this.addressInput.value.trim()
    if(!address) {
      return
    }

    const name = this.nameInput.value.trim()

    this.props.onSubmit({ name: name, address: address, archive: false })

    this.addressInput.value = this.nameInput.value = ''
  }

  render() {
    return (
      <div>
        <legend>Restaurant to add</legend>
        <form className='restaurant-form' onSubmit={ this.handleSubmit }>
          <input type='text' placeholder='Name' ref={ el => { this.nameInput = el } }/>
          <input type='text' placeholder='Address' ref={ el => { this.addressInput = el } }/>
          <input type='submit' value='Add restaurant'/>
        </form>
      </div>
    )
  }
}

export default RestaurantForm
