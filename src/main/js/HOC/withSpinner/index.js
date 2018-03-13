import React, { Component } from 'react'
import Spinner from '../../components/Spinner'
import { all } from 'ramda'
import { isEmpty } from '../../utils/object'

const withSpinner = (neededProps) => (WrappedComponent) => {
  return class SpinnerWrapper extends Component {
    render() {
      return (
        all((p) => !isEmpty(this.props[p]))(neededProps) ?
          <WrappedComponent {...this.props} />
          :
          <Spinner/>
      )
    }
  }
}

export default withSpinner
