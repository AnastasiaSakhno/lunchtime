import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../../IconButton'

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

    let text = `Name: ${ this.props.name }, Week days: ${ this.props.week_days ? this.props.week_days : 'All' }`

    return (
      <div className='restaurant'>
        { this.props.archive ? <del>{ text }</del> : text }
        { destroyIcon }
      </div>
    )
  }
}

const { string, bool, number, shape } = PropTypes

Menu.propTypes = {
  id: number,
  name: string.isRequired,
  week_days: string,
  restaurant: shape({
    id: number,
    name: string,
    archive: bool
  }),
  archive: bool.isRequired
}

export default Menu
