import React, { Component } from 'react'
import Spinner from '../../components/Spinner'
import { all } from 'ramda'

const isEmpty = (prop) => (
  prop === null ||
  prop === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)
)

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
