import CanCan from 'cancan'

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

export const cancanUser = (currentUser) => {
  if (!currentUser) {
    return new GuestUser()
  }
  return currentUser.role === 'ROLE_ADMIN' ? new AdminUser() : new RegularUser({user: currentUser})
}

allow(RegularUser, 'view', [MenuDocument, User, UserDayMenu])
allow(RegularUser, 'manage', UserDayMenu,
  (user, udm) => user.props.user._links.self.href === udm.props.user._links.self.href
)
allow(AdminUser, 'manage', 'all')
