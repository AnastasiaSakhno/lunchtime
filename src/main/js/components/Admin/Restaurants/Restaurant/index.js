import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../../IconButton'
import withCurrentUser from '../../../../HOC/withCurrentUser'
import {cancanUser, can, Restaurant as RestaurantItem} from '../../../abilities'

const {func, object} = PropTypes

@withCurrentUser
class Restaurant extends Component {
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
    let destroyIcon = !this.props.archive && can(user, 'delete', RestaurantItem)
      ? <IconButton icon={'fa-remove '} onSubmit={this.handleDestroy}/>
      : ''

    return (
      <tr>
        <td>{this.props.archive ? <del>{this.props.name}</del> : this.props.name}</td>
        <td>{this.props.archive ? <del>{this.props.address}</del> : this.props.address}</td>
        <td>{destroyIcon}</td>
      </tr>
    )
  }
}

const {string, bool, number} = PropTypes

Restaurant.propTypes = {
  id: number,
  name: string.isRequired,
  address: string,
  archive: bool.isRequired
}

export default Restaurant
