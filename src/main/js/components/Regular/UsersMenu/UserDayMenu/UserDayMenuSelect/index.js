import cancanBranch from '../../../../../HOC/branch/cancanBranch'
import {UserDayMenu} from '../../../../abilities'
import ManageableUserDayMenuSelect from './ManageableUserDayMenuSelect'
import ReadonlyUserDayMenuSelect from './ReadonlyUserDayMenuSelect'

export default cancanBranch({
  VerifiableClass: UserDayMenu,
  CanComponent: ManageableUserDayMenuSelect,
  CannotComponent: ReadonlyUserDayMenuSelect
})()
