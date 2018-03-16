import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import withCurrentUser from '../../../../HOC/withCurrentUser'
import {can, cancanUser, UserDayMenu} from '../../../abilities'

const {bool, number, object, func} = PropTypes

@withCurrentUser
class UserDayMenuOut extends Component {
  static propTypes = {
    onOutUpdate: func.isRequired,
    currentUser: object
  }

  handleUpdate = (e) => {
    e.preventDefault()

    this.props.onOutUpdate({id: this.props.id, out: this.outInput.checked, date: this.dateString(this.props.dayOfWeek)})
  }

  dateString = (dayOfWeek) => (moment().day(dayOfWeek).valueOf())

  render() {
    const user = cancanUser(this.props.currentUser)

    if (can(user, 'manage', new UserDayMenu(this.props))) {
      return (
        <div className='input-group-append'>
          <div className="input-group-text">
            <input
              type="checkbox"
              checked={this.props.out}
              disabled={!this.props.id}
              ref={el => {
                this.outInput = el
              }}
              onChange={this.handleUpdate}/>
          </div>
        </div>
      )
    }

    return <div className='float-left'>{this.props.out ? '(out)' : ''}</div>
  }
}

UserDayMenuOut.propTypes = {
  id: number,
  dayOfWeek: number.isRequired,
  out: bool
}

export default UserDayMenuOut
