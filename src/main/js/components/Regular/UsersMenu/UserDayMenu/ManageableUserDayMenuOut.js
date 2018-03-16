import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const {bool, number, func} = PropTypes

class ManageableUserDayMenuOut extends Component {
  static propTypes = {
    onOutUpdate: func.isRequired
  }

  handleUpdate = (e) => {
    e.preventDefault()

    this.props.onOutUpdate({
      id: this.props.id,
      out: e.target.checked,
      date: this.dateString(this.props.dayOfWeek)
    })
  }

  dateString = (dayOfWeek) => moment().day(dayOfWeek).valueOf()

  render() {
    return (
      <div className='input-group-append'>
        <div className="input-group-text">
          <input
            type="checkbox"
            checked={this.props.out}
            disabled={!this.props.id}
            onChange={this.handleUpdate}/>
        </div>
      </div>
    )
  }
}

ManageableUserDayMenuOut.propTypes = {
  id: number,
  dayOfWeek: number.isRequired,
  out: bool
}

export default ManageableUserDayMenuOut
