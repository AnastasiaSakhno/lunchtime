import React from 'react'
import {string, func} from 'prop-types'

const ActionButton = ({text, onSubmit}) => (
  <button className='btn btn-dark' onClick={onSubmit}>
    {text}
  </button>
)

ActionButton.propTypes = {
  text: string.isRequired,
  onSubmit: func.isRequired
}

export default ActionButton
