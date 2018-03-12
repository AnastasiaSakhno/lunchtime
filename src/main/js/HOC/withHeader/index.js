import React, { Component } from 'react'
import Header from '../../components/Header'

const withHeader = (WrappedComponent) => {
  return class HeaderWrapper extends Component {
    render() {
      return (
        <div>
          <Header {...this.props} />
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
}

export default withHeader
