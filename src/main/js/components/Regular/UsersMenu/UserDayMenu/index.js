import React, {Component} from 'react'
import {bool, string, number, shape, object, array, func} from 'prop-types'
import {eqProps} from 'ramda'

import BranchedUserDayMenu from './BranchedUserDayMenu'

class UserDayMenu extends Component {
  componentWillReceiveProps(newProps) {
    if (!eqProps('menu', this.props, newProps)
      || !eqProps('out', this.props, newProps)
      || !eqProps('day', this.props, newProps)) {
      $(this.udmContainer).effect('highlight', {}, 2000)
    }
  }

  render = () =>
    (<div
      className='col-2'
      style={this.props.menu && this.props.menu.colorHex ? {backgroundColor: this.props.menu.colorHex} : {}}
      ref={(el) => {
        this.udmContainer = el
      }}>
      <BranchedUserDayMenu {...this.props}/>
    </div>)
}

UserDayMenu.propTypes = {
  startDate: string,
  id: number,
  dayOfWeek: number.isRequired,
  out: bool,
  menu: shape({
    id: number,
    name: string,
    colorHex: string,
    restaurant: object
  }),
  user: shape({
    id: number,
    fullName: string
  }).isRequired,
  day: object,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  onChange: func.isRequired,
  onOutUpdate: func.isRequired,
  activeMenu: array.isRequired,
  menuList: array.isRequired,
  weekUdms: array.isRequired
}

export default UserDayMenu
