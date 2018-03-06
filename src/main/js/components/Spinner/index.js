import React, {Component} from 'react'
import styles from './index.scss'
import cssModules from 'react-css-modules'

class Spinner extends Component {
  render() {
    return (
      <div className='spinner'/>
    )
  }
}

export default cssModules(Spinner, styles)
