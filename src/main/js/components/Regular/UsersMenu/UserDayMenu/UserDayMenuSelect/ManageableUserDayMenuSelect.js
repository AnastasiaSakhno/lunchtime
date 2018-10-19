import React from 'react'
import {string, number, array, shape, func} from 'prop-types'

import {weekDateFormattedFromString, weekDateLong} from '../../../../../utils/date'
import {href} from '../../../../../utils/object'

const ManageableUserDayMenuSelect = ({startDate, id, dayOfWeek, menu, user,
  menuList, onSubmit, onUpdate, onChange, weekUdms}) => {
  const htmlId = () => `manageable-udm-select_${user.id}_${dayOfWeek}`

  const showWholeWeekDuplicationOffer = (menu) => {
    let selectedMenu = menuList.find(m => href(m) === menu)
    if(weekUdms.length === 0 && !selectedMenu.weekDays) {
      onChange({
        date: weekDateFormattedFromString(startDate, dayOfWeek),
        active: true,
        user: user,
        menu: selectedMenu,
        target: htmlId()
      })
    } else {
      onChange({active: false, target: null})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let attrs = {
      date: weekDateLong(startDate, dayOfWeek),
      user: href(user),
      menu: e.target.value
    }

    if (id) {
      onUpdate({id: id, ...attrs})
    } else {
      onSubmit({...attrs})
      showWholeWeekDuplicationOffer(attrs.menu)
    }
  }

  let selected = href(menu)
  return (
    <select
      id={htmlId()}
      className='form-control form-control-sm custom-select user-day-menu-select'
      style={menu && menu.colorHex ? {backgroundColor: menu.colorHex} : {}}
      value={selected}
      onChange={handleSubmit}>
      <option/>
      {menuList.map((m) => (
        <option
          value={href(m)}
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
    name: string,
    colorHex: string
  }),
  user: shape({
    id: number,
    fullName: string
  }).isRequired,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  onChange: func.isRequired,
  menuList: array.isRequired,
  weekUdms: array.isRequired
}

export default ManageableUserDayMenuSelect
