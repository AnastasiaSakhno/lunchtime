import React, { Component } from 'react'
import { Redirect } from 'react-router'

const RedirectToLoginHOC = (WrappedComponent) => {
  return class HeaderWrapper extends Component {
    render() {
      return (
        this.props.authenticated ?
          <WrappedComponent {...this.props} />
          :
          <Redirect to='/login'/>
      )
    }
  }
}

export default RedirectToLoginHOC