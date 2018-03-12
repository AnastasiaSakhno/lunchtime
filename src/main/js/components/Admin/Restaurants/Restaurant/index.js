import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../../IconButton'

class Restaurant extends Component {
  static propTypes = {
    onDestroy: PropTypes.func.isRequired
  }

  handleDestroy = (e) => {
    e.preventDefault()
    this.props.onDestroy({ ...this.props })
  }

  render() {
    let destroyIcon = <IconButton icon={ 'fa-remove ' } onSubmit={ this.handleDestroy } />
    if(this.props.archive) {
      destroyIcon = ''
    }

    let text = `Name: ${ this.props.name }, Address: ${ this.props.address }`

    return (
      <div className='restaurant'>
        { this.props.archive ? <del>{ text }</del> : text }
        { destroyIcon }
      </div>
    )
  }
}

const { string, bool, number } = PropTypes

Restaurant.propTypes = {
  id: number,
  name: string.isRequired,
  address: string,
  archive: bool.isRequired
}

export default Restaurant
