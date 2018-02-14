import React, { Component } from 'react'
import PropTypes from 'prop-types'

class IconButton extends Component {
  render() {
    return (
      <span className='iconbutton-box' onClick={ this.props.onSubmit }>
        <i className={ 'fa ' + this.props.icon }/>
      </span>
    )
  }
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default IconButton
