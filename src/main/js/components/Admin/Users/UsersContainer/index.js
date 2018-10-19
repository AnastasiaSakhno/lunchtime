import React, {PureComponent} from 'react'
import {array, func} from 'prop-types'

import {UsersList} from '../../Users'
import withNeededStores from '../../../../HOC/withNeededStores'
import actions from '../../../../actions'
import {connect} from 'react-redux'

@withNeededStores(['authorities', 'users'])
class UsersContainer extends PureComponent {
  static propTypes = {
    users: array,
    authorities: array,
    updateUser: func.isRequired,
    updateUserRoles: func.isRequired
  }

  render = () => (
    <div className="users-container">
      <UsersList
        users={this.props.users}
        authorities={this.props.authorities}
        onUpdate={this.props.updateUser}
        onRolesUpdate={this.props.updateUserRoles}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(actions.users.update(user)),
  updateUserRoles: (user) => dispatch(actions.users.updateRoles(user))
})

export default connect(null, mapDispatchToProps)(UsersContainer)
