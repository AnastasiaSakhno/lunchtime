import React, { Component } from 'react'
import { all } from 'ramda'

import Spinner from '../../components/Spinner'
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
