import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UserDayMenu from '../UserDayMenu'

const {string, number, bool, object, array, arrayOf, shape, func} = PropTypes

class UserWeekMenu extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    onUpdate: func.isRequired,
    onOutUpdate: func.isRequired,
    menuList: array.isRequired
  }

  render() {
    return (
      <tr className='row'>
        <td className='col-2'>{this.props.user.fullName}</td>
        {[...Array(5).keys()].map((dayOfWeek) => {
          dayOfWeek = dayOfWeek + 1
          let found = this.props.data.find((udm) => (
            udm.date.dayOfWeek === dayOfWeek
          ))
          let key = `udm_${this.props.user.id}_${dayOfWeek}`
          if (found) {
            return (<UserDayMenu key={key} dayOfWeek={dayOfWeek} {...this.props} {...found}/>)
          }
          return (<UserDayMenu key={key} dayOfWeek={dayOfWeek} {...this.props}/>)
        })}
      </tr>
    )
  }
}

UserWeekMenu.propTypes = {
  user: shape({
    id: number,
    fullName: string
  }).isRequired,
  data: arrayOf(
    shape({
      id: number,
      out: bool,
      date: object,
      archive: bool,
      menu: shape({
        id: number,
        name: string
      })
    })
  ).isRequired
}

export default UserWeekMenu
