import React, {Component} from 'react'
import {string} from 'prop-types'
import {NavItem} from 'reactstrap'
import {LinkContainer} from 'react-router-bootstrap'

import cancanBranch from '../../../HOC/branch/cancanBranch'
import {Menu, MenuDocument, Restaurant, User} from '../../abilities'

class PureHeaderLink extends Component {
  toggleActive = (e) => {
    $('.nav-link.active').toggleClass('active')
    $(e.target).toggleClass('active')
  }

  render = () => (
    <LinkContainer to={this.props.path}>
      <NavItem className='nav-link' onClick={this.toggleActive}>{this.props.name}</NavItem>
    </LinkContainer>
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
