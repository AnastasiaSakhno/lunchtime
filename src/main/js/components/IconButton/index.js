import React from 'react'
import {string, func} from 'prop-types'

const IconButton = ({icon, onSubmit}) => (
  <span className='iconbutton-box' onClick={onSubmit}>
    <i className={`fa animated-hover faa-vertical ${ icon }`}/>
  </span>
)

IconButton.propTypes = {
  icon: string.isRequired,
  onSubmit: func.isRequired
}

export default IconButton
