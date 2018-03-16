import {connect} from 'react-redux'
import {compose, branch, renderComponent} from 'recompose'
import {can, cancanUser, UserDayMenu} from '../../../../abilities'
import selectors from '../../../../../selectors'
import ManageableUserDayMenuSelect from './ManageableUserDayMenuSelect'
import ReadonlyUserDayMenuSelect from './ReadonlyUserDayMenuSelect'

const mapStateToProps = (state) => {
  return {
    currentUser: selectors.auth.getCurrentUser(state)
  }
}

// TODO move the same to function component
export default compose(
  connect(mapStateToProps),
  branch(
    (props) => {
      const user = cancanUser(props.currentUser)
      return can(user, 'manage', new UserDayMenu(props))
    },
    renderComponent(ManageableUserDayMenuSelect),
    renderComponent(ReadonlyUserDayMenuSelect)
  )
)()
