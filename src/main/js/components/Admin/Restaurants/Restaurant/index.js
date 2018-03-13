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

    let text = `Name: ${ this.props.name }, Address: ${ this.props.address }`

    return (
      <div className='restaurant'>
        {this.props.archive ? <del>{text}</del> : text}
        {destroyIcon}
      </div>
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
