import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const {bool, number, func} = PropTypes

class UserDayMenuOut extends Component {
  static propTypes = {
    onUpdate: func.isRequired
  }

  handleUpdate = (e) => {
    e.preventDefault()

    this.props.onUpdate({id: this.props.id, out: this.outInput.checked, date: this.dateString(this.props.dayOfWeek)})
  }

  dateString = (dayOfWeek) => (moment().day(dayOfWeek).valueOf())

  render() {
    if (this.props.editable) {
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

    return <div>{this.props.out ? '(out)' : ''}</div>
  }
}

UserDayMenuOut.propTypes = {
  id: number,
  dayOfWeek: number.isRequired,
  out: bool,
  editable: bool.isRequired
}

export default UserDayMenuOut
