import React from 'react'
import {bool, string, number, func, shape} from 'prop-types'

import {weekDateLong} from '../../../../../utils/date'

const ManageableUserDayMenuOut = ({startDate, id, dayOfWeek, out, menu, onOutUpdate}) => {
  const handleUpdate = (e) => {
    e.preventDefault()

    onOutUpdate({
      id: id,
      out: e.target.checked,
      date: weekDateLong(startDate, dayOfWeek)
    })
  }

  return (
    <div className='input-group-append'>
      <div className="input-group-text">
        <input
          type='checkbox'
          checked={out}
          disabled={!id || menu && menu.name === 'None'}
          onChange={handleUpdate}/>
      </div>
    </div>
  )
}

ManageableUserDayMenuOut.propTypes = {
  startDate: string,
  id: number,
  dayOfWeek: number.isRequired,
  out: bool,
  menu: shape({
    id: number,
    name: string
  }),
  onOutUpdate: func.isRequired
}

export default ManageableUserDayMenuOut
