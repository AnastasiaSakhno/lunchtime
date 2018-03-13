import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'
import {Link} from 'react-router-dom'

class LogoutLink extends Component {
  render() {
    return <Link onClick={this.props.logout} className='nav-link' to='#'>Logout</Link>
  }
}

LogoutLink.propTypes = ({
  logout: PropTypes.func.isRequired
})

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout())
  }
})

export default connect(null, mapDispatchToProps)(LogoutLink)
