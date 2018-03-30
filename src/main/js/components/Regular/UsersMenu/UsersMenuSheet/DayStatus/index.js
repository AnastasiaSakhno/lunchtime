import cancanBranch from '../../../../../HOC/branch/cancanBranch'
import {Day} from '../../../../abilities'
import ManageableDayStatus from './ManageableDayStatus'

export default cancanBranch({
  VerifiableClass: Day,
  CanComponent: ManageableDayStatus
})()
