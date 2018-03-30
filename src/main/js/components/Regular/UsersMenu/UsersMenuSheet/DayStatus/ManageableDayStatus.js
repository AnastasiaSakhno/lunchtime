import React from 'react'
import {string, number, bool, func} from 'prop-types'
import cssModules from 'react-css-modules'

import styles from './index.scss'
import {dateLong} from '../../../../../utils/date'

const ManageableDayStatus = ({id, closed, date, onSubmit, onUpdate}) => {
  const handleClick = (e) => {
    e.preventDefault()

    const dateNumber = dateLong(date)

    if (id) {
      onUpdate({
        id: id,
        closed: !closed,
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
        {id ? (closed ? 'Reopen' : 'Close') : 'Close'}
      </span>
    </div>
  )
}

ManageableDayStatus.propTypes = {
  id: number,
  closed: bool.isRequired,
  date: string.isRequired,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired
}

export default cssModules(ManageableDayStatus, styles)
