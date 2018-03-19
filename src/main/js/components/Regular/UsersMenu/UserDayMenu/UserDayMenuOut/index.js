import cancanBranch from '../../../../../HOC/branch/cancanBranch'
import {UserDayMenu} from '../../../../abilities'
import ManageableUserDayMenuOut from './ManageableUserDayMenuOut'
import ReadonlyUserDayMenuOut from './ReadonlyUserDayMenuOut'

export default cancanBranch({
  VerifiableClass: UserDayMenu,
  CanComponent: ManageableUserDayMenuOut,
  CannotComponent: ReadonlyUserDayMenuOut
})()
