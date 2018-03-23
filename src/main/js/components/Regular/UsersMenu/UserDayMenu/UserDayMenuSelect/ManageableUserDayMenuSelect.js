import React from 'react'
import {string, number, array, shape, func} from 'prop-types'

import {weekDateLong} from '../../../../../utils/date'

const ManageableUserDayMenuSelect = ({startDate, id, dayOfWeek, menu, user, menuList, onSubmit, onUpdate}) => {
  const handleSubmit = (e) => {
    e.preventDefault()

    let attrs = {
      date: weekDateLong(startDate, dayOfWeek),
      user: user._links.self.href,
      menu: e.target.value
    }

    if (id) {
      onUpdate({id: id, ...attrs})
    } else {
      onSubmit({...attrs})
    }
  }

  let selected = menu ? menu._links.self.href : ''
  return (
    <select
      className="form-control custom-select"
      value={selected}
      onChange={handleSubmit}>
      {menuList.map((m) => (
        <option
          value={m._links.self.href}
          key={`menu-option_${m.id}`}>
          {m.name}
        </option>
      ))}
    </select>
  )
}

ManageableUserDayMenuSelect.propTypes = {
  startDate: string,
  id: number,
  dayOfWeek: number.isRequired,
  menu: shape({
    id: number,
    name: string
  }),
  user: shape({
    id: number,
    fullName: string
  }).isRequired,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  menuList: array.isRequired
}

export default ManageableUserDayMenuSelect
