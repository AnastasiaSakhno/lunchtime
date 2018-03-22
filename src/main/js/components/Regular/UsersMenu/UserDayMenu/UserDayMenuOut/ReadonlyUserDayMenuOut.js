import React from 'react'
import {bool} from 'prop-types'

const ReadonlyUserDayMenuOut = ({out}) =>
  <div className='float-left'>{out ? '(out)' : ''}</div>

ReadonlyUserDayMenuOut.propTypes = {
  out: bool
}

export default ReadonlyUserDayMenuOut
