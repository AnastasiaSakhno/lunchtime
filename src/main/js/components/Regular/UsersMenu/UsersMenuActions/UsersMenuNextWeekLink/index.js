import React from 'react'
import {object, func} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import actions from '../../../../../actions'

const UsersMenuNextWeekLink = ({startDate, loadNextWeek}) => (
  <Link
    onClick={() => loadNextWeek(startDate)}
    className='users-menu-next badge badge-dark'
    to='#'>
    Next
  </Link>
)

UsersMenuNextWeekLink.propTypes = ({
  startDate: object.isRequired,
  loadNextWeek: func.isRequired
})

const mapDispatchToProps = dispatch => ({
  loadNextWeek: (startDate) => {
    dispatch(actions.usersMenu.loadNextWeek(startDate))
    dispatch(actions.days.load(startDate))
  }
})

export default connect(null, mapDispatchToProps)(UsersMenuNextWeekLink)
