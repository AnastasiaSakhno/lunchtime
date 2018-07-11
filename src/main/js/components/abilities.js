import CanCan from 'cancan'

import {href} from '../utils/object'
import moment from 'moment/moment'
import {formattedDate} from '../utils/date'

const cancan = new CanCan()
export const {allow, can, cannot} = cancan

export class WithProps {
  constructor(props) {
    this.props = props
  }
}

export class GuestUser {}
export class RegularUser extends WithProps {}
export class AdminUser {}
export class Menu {}
export class MenuDocument {}
export class Restaurant {}
export class User {}
export class UserDayMenu extends WithProps {}
export class Day extends WithProps {}

export const cancanUser = (currentUser) => {
  if (!currentUser) {
    return new GuestUser()
  }
  return currentUser.roles.includes('ROLE_ADMIN') ? new AdminUser() : new RegularUser({user: currentUser})
}

const canManageDayByTime = (udm) => moment(formattedDate(udm.props.date)).diff(moment(), 'days') >= 0
const canManageUdmDay = (udm) => !udm.props.day || !udm.props.day.closed
const canManageUdmMandatory = (udm) => canManageUdmDay(udm) && canManageDayByTime(udm)

allow(RegularUser, 'view', [MenuDocument, User, UserDayMenu])
allow(RegularUser, 'manage', UserDayMenu,
  (user, udm) => href(user.props.user) === href(udm.props.user) && canManageUdmMandatory(udm)
)

allow(AdminUser, 'manage', [Menu, MenuDocument, Restaurant, User])

allow(AdminUser, 'view', UserDayMenu)
allow(AdminUser, 'manage', UserDayMenu,
  (_, udm) => canManageUdmMandatory(udm)
)

allow(AdminUser, 'close', Day)
