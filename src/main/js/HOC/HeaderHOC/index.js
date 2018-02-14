import React, { Component } from 'react'
import Header from '../../components/Header'

const HeaderHOC = (WrappedComponent) => {
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

export default HeaderHOC
