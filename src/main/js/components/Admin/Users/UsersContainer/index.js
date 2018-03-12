import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../../actions'
import { UsersList, UserForm } from '../../Users'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'

const { bool, array, func } = PropTypes

@withHeader
@withRedirectToLogin
class UsersContainer extends PureComponent {
  static propTypes = {
    loadUsers: func.isRequired,
    addUser: func.isRequired,
    users: array.isRequired,
    authenticated: bool.isRequired
  }

  componentDidMount() {
    if(this.props.authenticated) {
      this.props.loadUsers()
    }
  }

  render() {
    return (
      <div className="users-container">
        <UserForm onSubmit={ this.props.addUser }/>
        <UsersList data={ this.props.users } />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  authenticated: state.session.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  loadUsers: () => {
    dispatch(actions.users.load())
  },
  addUser: (user) => {
    dispatch(actions.users.add(user))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
