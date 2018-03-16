import {can, cancanUser, UserDayMenu} from '../../../abilities'
import {connect} from 'react-redux'
import {compose, branch, renderComponent} from 'recompose'
import ManageableUserDayMenuOut from './ManageableUserDayMenuOut'
import ReadonlyUserDayMenuOut from './ReadonlyUserDayMenuOut'
import selectors from '../../../../selectors'

const mapStateToProps = (state) => {
  return {
    currentUser: selectors.auth.getCurrentUser(state)
  }
}

export default compose(
  connect(mapStateToProps),
  branch(
    (props) => {
      const user = cancanUser(props.currentUser)
      return can(user, 'manage', new UserDayMenu(props))
    },
    renderComponent(ManageableUserDayMenuOut),
    renderComponent(ReadonlyUserDayMenuOut)
  )
)()
