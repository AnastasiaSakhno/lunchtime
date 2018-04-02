import React, {Component} from 'react'
import {string, object} from 'prop-types'
import {Link} from 'react-router-dom'
import {NavItem} from 'reactstrap'

import cancanBranch from '../../../HOC/branch/cancanBranch'
import {Menu, MenuDocument, Restaurant, User} from '../../abilities'

class PureHeaderLink extends Component {
  static contextTypes = {
    router: object
  }

  render = () => (
    <NavItem active={this.props.path === this.context.router.history.location.pathname}>
      <Link className='nav-link' to={this.props.path}>{this.props.name}</Link>
    </NavItem>
  )
}

PureHeaderLink.propTypes = {
  path: string.isRequired,
  name: string.isRequired
}

export const headerLink = (VerifiableClass) => (
  cancanBranch({
    action: 'view',
    VerifiableClass: VerifiableClass,
    CanComponent: PureHeaderLink
  })()
)

export const RestaurantsHeaderLink = headerLink(Restaurant)
export const MenuHeaderLink = headerLink(Menu)
export const UsersHeaderLink = headerLink(User)
export const MenuDocumentsHeaderLink = headerLink(MenuDocument)
