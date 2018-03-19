import {connect} from 'react-redux'
import {compose, branch, renderComponent} from 'recompose'
import {can, cancanUser} from '../../components/abilities'
import selectors from '../../selectors'

const mapStateToProps = (state) => {
  return {
    currentUser: selectors.auth.getCurrentUser(state)
  }
}

export default (verifiableClass, ManageableComponent, ReadonlyComponent) => compose(
  connect(mapStateToProps),
  branch(
    (props) => {
      const user = cancanUser(props.currentUser)
      return can(user, 'manage', new verifiableClass(props))
    },
    renderComponent(ManageableComponent),
    renderComponent(ReadonlyComponent)
  )
)
