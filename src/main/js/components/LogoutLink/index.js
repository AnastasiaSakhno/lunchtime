import React from 'react'
import {func, string} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {logout} from '../../actions/auth'

const LogoutLink = ({logout, email}) => {
  return (
    <Link onClick={logout} className='nav-link logout' to='#'>{`Logout ${email}`}</Link>
  )
}

LogoutLink.propTypes = ({
  logout: func.isRequired,
  email: string.isRequired
})

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout())
  }
})

export default connect(null, mapDispatchToProps)(LogoutLink)
