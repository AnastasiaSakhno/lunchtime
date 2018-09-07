import React, {PureComponent} from 'react'
import {array, func} from 'prop-types'

import {UsersList} from '../../Users'
import withNeededStores from '../../../../HOC/withNeededStores'
import actions from '../../../../actions'
import {connect} from 'react-redux'

@withNeededStores(['users', 'authorities'])
class UsersContainer extends PureComponent {
  static propTypes = {
    users: array,
    authorities: array,
    updateUser: func.isRequired
  }

  render = () => (
    <div className="users-container">
      <UsersList users={this.props.users} authorities={this.props.authorities} onChange={this.props.updateUser}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(actions.users.update(user))
})

export default connect(null, mapDispatchToProps)(UsersContainer)
