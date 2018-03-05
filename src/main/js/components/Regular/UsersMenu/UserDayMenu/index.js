import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const {string, bool, number, object, array, shape, func} = PropTypes

class UserDayMenu extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    onUpdate: func.isRequired,
    menuList: array.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let attrs = {
      date: moment().day(this.props.dayOfWeek).valueOf(),
      user: this.props.user._links.self.href.replace('{?projection}', ''),
      menu: this.menuSelect.value
    }

    if (this.props.id) {
      this.props.onUpdate({id: this.props.id, ...attrs})
    } else {
      this.props.onSubmit({...attrs})
    }
  }

  editablePresentation = (selected) => (
    <div className="input-group mb-3">
      <select className="form-control custom-select"
        value={selected}
        onChange={this.handleSubmit}
        ref={el => {
          this.menuSelect = el
        }}>
        <option>Select a Restaurant</option>
        {this.props.menuList.map((menu) => (
          <option
            value={menu._links.self.href}
            key={`menu-option_${menu.id}`}>
            {menu.name}
          </option>
        ))}
      </select>
      <div className="input-group-append">
        <div className="input-group-text">
          <input type="checkbox"/>
        </div>
      </div>
    </div>
  )

  notEditablePresentation = (selected) => {
    let selectedMenu = this.props.menuList.find((m) => (m._links.self.href === selected))
    let menuName = selectedMenu ? selectedMenu.name : ''
    return <p>{`${menuName}${this.props.out ? ' (out)' : ''}`}</p>
  }

  render() {
    let selected = this.props.menu ? this.props.menu._links.self.href.replace('{?projection}', '') : ''

    return (
      <td>
        {this.props.editable ? this.editablePresentation(selected) : this.notEditablePresentation(selected)}
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
