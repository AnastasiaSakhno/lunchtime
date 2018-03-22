import React from 'react'
import {object, func} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {loadPrevWeek} from '../../../../../actions/users_menu'

const UsersMenuPrevWeekLink = ({startDate, loadPrevWeek}) => (
  <Link
    onClick={() => loadPrevWeek(startDate)}
    className='users-menu-forward-arrow badge badge-dark'
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
    dispatch(loadPrevWeek(startDate))
  }
})

export default connect(null, mapDispatchToProps)(UsersMenuPrevWeekLink)
