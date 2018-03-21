import React from 'react'
import {bool, string, number, array, func, shape} from 'prop-types'
import moment from 'moment'

const ManageableUserDayMenuOut = ({id, dayOfWeek, out, menu, menuList, onOutUpdate}) => {
  const dateString = (dayOfWeek) => moment().day(dayOfWeek).valueOf()

  const handleUpdate = (e) => {
    e.preventDefault()

    onOutUpdate({
      id: id,
      out: e.target.checked,
      date: dateString(dayOfWeek)
    })
  }

  if (menu) {
    menu = menuList.find(m => m._links.self.href === menu._links.self.href.replace('{?projection}', ''))
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
  id: number,
  dayOfWeek: number.isRequired,
  out: bool,
  menu: shape({
    id: number,
    name: string
  }),
  onOutUpdate: func.isRequired,
  menuList: array.isRequired
}

export default ManageableUserDayMenuOut
