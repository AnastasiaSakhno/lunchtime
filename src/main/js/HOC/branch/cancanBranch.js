import React from 'react'
import {connect} from 'react-redux'

import {compose, branch, renderComponent} from 'recompose'
import {can, cancanUser} from '../../components/abilities'
import selectors from '../../selectors'

const mapStateToProps = (state) => ({
  currentUser: selectors.auth.getCurrentUser(state)
})

const DefaultCannotComponent = () => <none/>

export default ({action = 'manage', VerifiableClass, CanComponent, CannotComponent = DefaultCannotComponent}) =>
  compose(
    connect(mapStateToProps),
    branch(
      (props) => {
        const user = cancanUser(props.currentUser)
        return can(user, action, new VerifiableClass(props))
      },
      renderComponent(CanComponent),
      renderComponent(CannotComponent)
    )
  )
