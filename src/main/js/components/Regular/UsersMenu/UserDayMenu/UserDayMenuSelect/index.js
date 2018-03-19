import cancanBranch from '../../../../../HOC/cancanBranch'
import {UserDayMenu} from '../../../../abilities'
import ManageableUserDayMenuSelect from './ManageableUserDayMenuSelect'
import ReadonlyUserDayMenuSelect from './ReadonlyUserDayMenuSelect'

export default cancanBranch({
  verifiableClass: UserDayMenu,
  CanComponent: ManageableUserDayMenuSelect,
  CannotComponent: ReadonlyUserDayMenuSelect
})()
