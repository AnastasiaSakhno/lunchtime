import React from 'react'
import {connect} from 'react-redux'

import {compose, branch, renderComponent} from 'recompose'
import {can, cancanUser} from '../../components/abilities'
import selectors from '../../selectors'

const mapStateToProps = (state) => {
  return {
    currentUser: selectors.auth.getCurrentUser(state)
  }
}

export default ({action = 'manage', verifiableClass, CanComponent, CannotComponent = () => <none/>}) => compose(
  connect(mapStateToProps),
  branch(
    (props) => {
      const user = cancanUser(props.currentUser)
      return can(user, action, new verifiableClass(props))
    },
    renderComponent(CanComponent),
    renderComponent(CannotComponent)
  )
)
