import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const ManageableUserDayMenuOut = ({id, dayOfWeek, out, onOutUpdate}) => {
  const dateString = (dayOfWeek) => moment().day(dayOfWeek).valueOf()

  const handleUpdate = (e) => {
    e.preventDefault()

    onOutUpdate({
      id: id,
      out: e.target.checked,
      date: dateString(dayOfWeek)
    })
  }

  return (
    <div className='input-group-append'>
      <div className="input-group-text">
        <input
          type='checkbox'
          checked={out}
          disabled={!id}
          onChange={handleUpdate}/>
      </div>
    </div>
  )
}

const {bool, number, func} = PropTypes

ManageableUserDayMenuOut.propTypes = {
  id: number,
  dayOfWeek: number.isRequired,
  out: bool,
  onOutUpdate: func.isRequired
}

export default ManageableUserDayMenuOut
