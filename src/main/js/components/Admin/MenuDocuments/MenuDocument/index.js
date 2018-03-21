import cancanBranch from '../../../../HOC/branch/cancanBranch'
import ManageableMenuDocument from './ManageableMenuDocument'
import ReadonlyMenuDocument from './ReadonlyMenuDocument'
import {MenuDocument} from '../../../abilities'

export default cancanBranch({
  VerifiableClass: MenuDocument,
  CanComponent: ManageableMenuDocument,
  CannotComponent: ReadonlyMenuDocument
})()
