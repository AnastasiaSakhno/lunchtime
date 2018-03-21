import cancanBranch from '../../../../HOC/branch/cancanBranch'
import ManageableUserDayMenu from './ManageableUserDayMenu'
import ReadonlyUserDayMenu from './ReadonlyUserDayMenu'
import {UserDayMenu} from '../../../abilities'

export default cancanBranch({
  VerifiableClass: UserDayMenu,
  CanComponent: ManageableUserDayMenu,
  CannotComponent: ReadonlyUserDayMenu
})()
