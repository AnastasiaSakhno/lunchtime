import React from 'react'
import {string} from 'prop-types'
import {connect} from 'react-redux'

const Alert = ({message}) => (
  message ? <div className="alert alert-warning alert-dismissible fade show" role="alert">
    {message}
    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div> : <none/>
)

Alert.propTypes = {
  message: string
}

const mapStateToProps = (state) => ({
  message: state.auth.error
})

export default connect(mapStateToProps, null)(Alert)
