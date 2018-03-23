import React from 'react'
import {object, func} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {loadNextWeek} from '../../../../../actions/users_menu'

const UsersMenuNextWeekLink = ({startDate, loadNextWeek}) => (
  <Link
    onClick={() => loadNextWeek(startDate)}
    className='users-menu-forward-arrow badge badge-dark'
    to='#'>
    Forward
  </Link>
)

UsersMenuNextWeekLink.propTypes = ({
  startDate: object.isRequired,
  loadNextWeek: func.isRequired
})

const mapDispatchToProps = dispatch => ({
  loadNextWeek: (startDate) => {
    dispatch(loadNextWeek(startDate))
  }
})

export default connect(null, mapDispatchToProps)(UsersMenuNextWeekLink)
