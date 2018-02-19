import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../../IconButton/index'

class Menu extends Component {
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

    let text = `Name: ${ this.props.name }, Week days: ${ this.props.week_days }`

    return (
      <div className='restaurant'>
        { this.props.archive ? <del>{ text }</del> : text }
        { destroyIcon }
      </div>
    )
  }
}

const { string, bool, number } = PropTypes

Menu.propTypes = {
  id: number,
  name: string.isRequired,
  week_days: string,
  restaurant_id: number,
  archive: bool.isRequired
}

export default Menu
