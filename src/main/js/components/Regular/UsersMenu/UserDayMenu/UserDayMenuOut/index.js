import cancanBranch from '../../../../../HOC/cancanBranch'
import {UserDayMenu} from '../../../../abilities'
import ManageableUserDayMenuOut from './ManageableUserDayMenuOut'
import ReadonlyUserDayMenuOut from './ReadonlyUserDayMenuOut'

export default cancanBranch(UserDayMenu, ManageableUserDayMenuOut, ReadonlyUserDayMenuOut)()
