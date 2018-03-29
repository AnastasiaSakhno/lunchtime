import React from 'react'
import {string, array, func} from 'prop-types'

import {weekDateFormattedFromObject} from '../../../../utils/date'

const DayStatus = ({days, date, onSubmit, onUpdate}) => {
  let found = days.find(d => weekDateFormattedFromObject(d.date) === date)

  return (
    <div className='float-right'>
      <span className="badge badge-light">{found ? (found.closed ? 'Reopen' : 'Close') : 'Close'}</span>
    </div>
  )
}

DayStatus.propTypes = {
  days: array.isRequired,
  date: string.isRequired,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired
}

export default DayStatus
