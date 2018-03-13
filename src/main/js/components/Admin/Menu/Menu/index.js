import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../../IconButton'
import withCurrentUser from '../../../../HOC/withCurrentUser'
import {cancanUser, can, Menu as MenuItem} from '../../../abilities'

const {func, object} = PropTypes

@withCurrentUser
class Menu extends Component {
  static propTypes = {
    onDestroy: func.isRequired,
    currentUser: object
  }

  handleDestroy = (e) => {
    e.preventDefault()
    this.props.onDestroy({...this.props})
  }

  render() {
    const user = cancanUser(this.props.currentUser)
    let destroyIcon = !this.props.archive && can(user, 'delete', MenuItem)
      ? <IconButton icon={'fa-remove '} onSubmit={this.handleDestroy}/>
      : ''

    let text = `Name: ${ this.props.name }, Week days: ${ this.props.week_days ? this.props.week_days : 'All' }`

    return (
      <div className='restaurant'>
        {this.props.archive ? <del>{text}</del> : text}
        {destroyIcon}
      </div>
    )
  }
}

const {string, bool, number, shape} = PropTypes

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
