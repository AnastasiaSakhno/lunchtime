import React from 'react'
import {string, number, bool, func} from 'prop-types'
import cssModules from 'react-css-modules'

import styles from './index.scss'
import {dateLong} from '../../../../../../utils/date'

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

  const val = id ? (closed ? 'Reopen' : 'Close') : 'Close'

  return (
    <span
      onClick={handleClick}
      className={
        `badge badge-light day-status_manageable day-status_manageable_${val === 'Reopen' ? 'closed' : 'open'}`
      }>
      {val}
    </span>
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
