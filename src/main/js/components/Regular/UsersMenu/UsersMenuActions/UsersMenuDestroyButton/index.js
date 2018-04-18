import cancanBranch from '../../../../../HOC/branch/cancanBranch'
import {User} from '../../../../abilities'
import ManageableUsersMenuDestroyButton from './ManageableUsersMenuDestroyButton'

export default cancanBranch({
  VerifiableClass: User,
  CanComponent: ManageableUsersMenuDestroyButton
})()
