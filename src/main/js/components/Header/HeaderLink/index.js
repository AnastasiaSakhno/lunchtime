import React from 'react'
import {string} from 'prop-types'
import {Link} from 'react-router-dom'

import cancanBranch from '../../../HOC/branch/cancanBranch'
import {Menu, MenuDocument, Restaurant, User} from '../../abilities'

const PureHeaderLink = ({url, name}) => (
  <li className="nav-item">
    <Link className='nav-link' to={url}>{name}</Link>
  </li>
)

PureHeaderLink.propTypes = {
  url: string.isRequired,
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
