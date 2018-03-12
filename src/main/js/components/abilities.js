import CanCan from 'cancan'

const cancan = new CanCan()
export const {allow, can, cannot} = cancan

export class RegularUser {}
export class AdminUser {}
export class Menu {}

allow(RegularUser, 'view', 'all')
allow(AdminUser, 'manage', 'all')

export const cancanUser = (currentUser) =>
  currentUser && currentUser.role === 'ROLE_ADMIN' ? new AdminUser() : new RegularUser()
