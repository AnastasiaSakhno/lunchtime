import React from 'react'
import {string, func} from 'prop-types'

const ActionButton = ({text, onSubmit, classes}) => (
  <button className={`btn btn-dark ${classes}`} onClick={onSubmit}>
    {text}
  </button>
)

ActionButton.propTypes = {
  text: string.isRequired,
  onSubmit: func.isRequired,
  classes: string
}

export default ActionButton
