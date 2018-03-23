import React from 'react'
import {string, number, array, shape, func} from 'prop-types'
import moment from 'moment'

const ManageableUserDayMenuSelect = ({startDate, id, dayOfWeek, menu, user, menuList, onSubmit, onUpdate}) => {
  const dateString = (day) => (moment(startDate, 'YYYY-MM-DD').day(day).valueOf())

  const handleSubmit = (e) => {
    e.preventDefault()

    let attrs = {
      date: dateString(dayOfWeek),
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
      {menuList.map((menu) => (
        <option
          value={menu._links.self.href}
          key={`menu-option_${menu.id}`}>
          {menu.name}
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
