import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const {string, number, array, shape, func} = PropTypes

const ManageableUserDayMenuSelect = ({id, dayOfWeek, menu, user, menuList, onSubmit, onUpdate}) => {

  const dateString = (dayOfWeek) => (moment().day(dayOfWeek).valueOf())

  const handleSubmit = (e) => {
    e.preventDefault()

    let attrs = {
      date: dateString(dayOfWeek),
      user: user._links.self.href.replace('{?projection}', ''),
      menu: e.target.value
    }

    if (id) {
      onUpdate({id: id, ...attrs})
    } else {
      onSubmit({...attrs})
    }
  }

  let selected = menu ? menu._links.self.href.replace('{?projection}', '') : ''
  return (
    <select
      className="form-control custom-select"
      value={selected}
      onChange={handleSubmit}>
      <option>Select a Restaurant</option>
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
