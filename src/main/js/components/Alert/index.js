import React from 'react'
import {object} from 'prop-types'
import {connect} from 'react-redux'

const Alert = ({alerts}) => {
  const map = Object.keys(alerts).map(type =>
    (
      alerts[type] ?
        <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
          {alerts[type]}
        </div>
        : <none/>
    )
  )
  return <div>{map}</div>
}

Alert.propTypes = {
  alerts: object
}

const mapStateToProps = (state) => ({
  alerts: state.alerts
})

export default connect(mapStateToProps, null)(Alert)
