import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import selectors from '../../selectors'

const withCurrentUser = (WrappedComponent) => {

  class LoggedInUserWrapper extends Component {
    static propTypes = {
      currentUser: PropTypes.object
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    currentUser: selectors.auth.getCurrentUser(state)
  })

  return connect(mapStateToProps)(LoggedInUserWrapper)
}

export default withCurrentUser
