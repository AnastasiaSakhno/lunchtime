import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../components/Spinner'

const SpinnerHOC = (WrappedComponent) => {
  return class HeaderWrapper extends Component {
    static propTypes = {
      loaded: PropTypes.bool.isRequired
    }

    render() {
      return (
        this.props.loaded ?
          <WrappedComponent {...this.props} />
          :
          <Spinner/>
      )
    }
  }
}

export default SpinnerHOC
