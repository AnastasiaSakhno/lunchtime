import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../IconButton'

class Restaurant extends Component {
  static propTypes = {
    onDestroy: PropTypes.func.isRequired
  }

  handleDestroy = (e) => {
    e.preventDefault()
    this.props.onDestroy({ id: this.props.id })
  }

  render() {
    let destroyIcon = <IconButton icon={ 'fa-remove ' } onSubmit={ this.handleDestroy } />
    if(this.props.archive) {
      destroyIcon = ''
    }

    return (
      <div className='restaurant'>
        Name: { this.props.name }, Address: { this.props.address }
        { destroyIcon }
      </div>
    )
  }
}

const { string, bool, integer } = PropTypes

Restaurant.propTypes = {
  id: integer,
  name: string.isRequired,
  address: string,
  archive: bool.isRequired
}

export default Restaurant
