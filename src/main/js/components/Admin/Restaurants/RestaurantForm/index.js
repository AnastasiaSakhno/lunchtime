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
        <form className='restaurant-form' onSubmit={ this.handleSubmit }>
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
              <label className="sr-only" htmlFor="address_input">Address</label>
              <input type='text'
                className="form-control"
                id='address_input'
                placeholder='Address'
                ref={ el => { this.addressInput = el } }/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mr-sm-2">Add restaurant</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default RestaurantForm
