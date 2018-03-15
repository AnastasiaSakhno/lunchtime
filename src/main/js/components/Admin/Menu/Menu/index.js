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

    return (
      <tr>
        <td>{this.props.archive ? <del>{this.props.restaurant.name}</del> : this.props.restaurant.name}</td>
        <td>{this.props.archive ? <del>{this.props.name}</del> : this.props.name}</td>
        <td>{this.props.archive ? <del>{this.props.week_days}</del> : 'All'}</td>
        <td>{destroyIcon}</td>
      </tr>
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
