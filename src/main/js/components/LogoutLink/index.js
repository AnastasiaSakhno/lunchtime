import React from 'react'
import {func} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {logout} from '../../actions/auth'

const LogoutLink = ({logout}) => (
  <Link onClick={logout} className='nav-link' to='#'>Logout</Link>
)

LogoutLink.propTypes = ({
  logout: func.isRequired
})

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout())
  }
})

export default connect(null, mapDispatchToProps)(LogoutLink)
