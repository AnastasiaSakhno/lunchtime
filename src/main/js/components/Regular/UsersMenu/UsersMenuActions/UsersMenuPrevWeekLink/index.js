import React from 'react'
import {object, func} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import actions from '../../../../../actions'

const UsersMenuPrevWeekLink = ({startDate, loadPrevWeek}) => (
  <Link
    onClick={() => loadPrevWeek(startDate)}
    className='users-menu-prev badge badge-dark'
    to='#'>
    Back
  </Link>
)

UsersMenuPrevWeekLink.propTypes = ({
  startDate: object.isRequired,
  loadPrevWeek: func.isRequired
})

const mapDispatchToProps = dispatch => ({
  loadPrevWeek: (startDate) => {
    dispatch(actions.usersMenu.loadPrevWeek(startDate))
    dispatch(actions.days.load(startDate))
  }
})

export default connect(null, mapDispatchToProps)(UsersMenuPrevWeekLink)
