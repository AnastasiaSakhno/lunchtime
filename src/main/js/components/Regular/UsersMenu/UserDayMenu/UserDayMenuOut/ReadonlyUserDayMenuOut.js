import React from 'react'
import PropTypes from 'prop-types'

const ReadonlyUserDayMenuOut = ({out}) =>
  <div className='float-left'>{out ? '(out)' : ''}</div>

ReadonlyUserDayMenuOut.propTypes = {
  out: PropTypes.bool
}

export default ReadonlyUserDayMenuOut
