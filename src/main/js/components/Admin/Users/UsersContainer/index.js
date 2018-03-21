import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../../../../actions'
import {UsersList, UserForm} from '../../Users'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import withNeededStores from '../../../../HOC/withNeededStores'
import withCurrentUser from '../../../../HOC/withCurrentUser'

const {array, object, func} = PropTypes

@withNeededStores(['users'])
@withRedirectToLogin
@withCurrentUser
@withHeader
class UsersContainer extends PureComponent {
  static propTypes = {
    addUser: func.isRequired,
    users: array,
    currentUser: object
  }

  render = () => (
    <div className="users-container">
      <UserForm onSubmit={this.props.addUser}/>
      <UsersList data={this.props.users}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => {
    dispatch(actions.users.add(user))
  }
})

export default connect(null, mapDispatchToProps)(UsersContainer)
