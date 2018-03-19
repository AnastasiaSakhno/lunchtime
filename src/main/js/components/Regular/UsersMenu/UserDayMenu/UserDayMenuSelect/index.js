import cancanBranch from '../../../../../HOC/cancanBranch'
import {UserDayMenu} from '../../../../abilities'
import ManageableUserDayMenuSelect from './ManageableUserDayMenuSelect'
import ReadonlyUserDayMenuSelect from './ReadonlyUserDayMenuSelect'

export default cancanBranch(UserDayMenu, ManageableUserDayMenuSelect, ReadonlyUserDayMenuSelect)()
