import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RootBox from '../RootBox'
import HeaderHOC from '../../HOC/HeaderHOC'
import RedirectToLoginHOC from '../../HOC/RedirectToLoginHOC'

@HeaderHOC
@RedirectToLoginHOC
class Home extends Component {
  render() {
    return (
      <div className='home'>
        <h3>Welcome, { this.props.user.email }</h3>
        <hr/>
        <RootBox/>
      </div>
    )
  }
}

const { object, bool } = PropTypes

Home.propTypes = {
  user: object,
  authenticated: bool.isRequired
}

const mapStateToProps = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated
})

export default connect(mapStateToProps)(Home)
