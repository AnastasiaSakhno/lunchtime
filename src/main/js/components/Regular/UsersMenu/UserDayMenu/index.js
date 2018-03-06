import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UserDayMenuSelect from './UserDayMenuSelect'
import UserDayMenuOut from './UserDayMenuOut'

const {string, bool, number, object, array, shape, func} = PropTypes

class UserDayMenu extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    onUpdate: func.isRequired,
    onOutUpdate: func.isRequired,
    menuList: array.isRequired
  }

  editablePresentation = () => (
    <div className="input-group mb-3">
      <UserDayMenuSelect { ...this.props }/>
      <UserDayMenuOut { ...this.props }/>
    </div>
  )

  notEditablePresentation = () => {
    return (
      <div className='container'>
        <div className='row'>
          <UserDayMenuSelect { ...this.props }/>
          <UserDayMenuOut { ...this.props }/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <td>
        {this.props.editable ? this.editablePresentation() : this.notEditablePresentation()}
      </td>
    )
  }
}

UserDayMenu.propTypes = {
  id: number,
  dayOfWeek: number.isRequired,
  date: object,
  out: bool,
  archive: bool,
  menu: shape({
    id: number,
    name: string
  }),
  user: shape({
    id: number,
    fullName: string
  }).isRequired,
  editable: bool.isRequired
}

export default UserDayMenu
