import React, {Component} from 'react'
import PropTypes from 'prop-types'
import UserDayMenuSelect from './UserDayMenuSelect'
import UserDayMenuOut from './UserDayMenuOut'
import withCurrentUser from '../../../../HOC/withCurrentUser'
import {can, cancanUser, UserDayMenu as UserDayMenuItem} from '../../../abilities'

const {string, bool, number, object, array, shape, func} = PropTypes

@withCurrentUser
class UserDayMenu extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    onUpdate: func.isRequired,
    onOutUpdate: func.isRequired,
    menuList: array.isRequired,
    currentUser: object
  }

  editablePresentation = () => (
    <div className="input-group mb-3">
      <UserDayMenuSelect {...this.props}/>
      <UserDayMenuOut {...this.props}/>
    </div>
  )

  notEditablePresentation = () => {
    return (
      <div className='container'>
        <div className='row'>
          <UserDayMenuSelect {...this.props}/>
          <UserDayMenuOut {...this.props}/>
        </div>
      </div>
    )
  }

  render() {
    const user = cancanUser(this.props.currentUser)

    return (
      <td>
        {
          can(user, 'manage', new UserDayMenuItem(this.props))
            ? this.editablePresentation()
            : this.notEditablePresentation()
        }
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
  }).isRequired
}

export default UserDayMenu
