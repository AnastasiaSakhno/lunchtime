import React from 'react'
import {string, array, func} from 'prop-types'
import cssModules from 'react-css-modules'

import styles from './index.scss'
import {dateLong, formattedDate} from '../../../../../utils/date'

const ManageableDayStatus = ({date, days, onSubmit, onUpdate}) => {
  let found = days.find(d => formattedDate(d.date) === date)

  const handleClick = (e) => {
    e.preventDefault()

    const dateNumber = dateLong(date)

    if (found) {
      onUpdate({
        id: found.id,
        closed: !found.closed,
        date: dateNumber
      })
    } else {
      onSubmit({
        closed: true,
        date: dateNumber
      })
    }
  }


  return (
    <div className='float-right'>
      <span onClick={handleClick} className="badge badge-light day-status_manageable">
        {found ? (found.closed ? 'Reopen' : 'Close') : 'Close'}
      </span>
    </div>
  )
}

ManageableDayStatus.propTypes = {
  date: string.isRequired,
  days: array.isRequired,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired
}

export default cssModules(ManageableDayStatus, styles)
