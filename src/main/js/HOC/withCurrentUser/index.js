import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
    currentUser: state.users.find((u) => (u.email === state.session.user.email))
  })

  return connect(mapStateToProps)(LoggedInUserWrapper)
}

export default withCurrentUser
