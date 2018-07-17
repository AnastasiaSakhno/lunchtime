import React, {PureComponent} from 'react'
import {array, func} from 'prop-types'

import {UsersList} from '../../Users'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import withNeededStores from '../../../../HOC/withNeededStores'

@withNeededStores(['users'])
@withRedirectToLogin
@withHeader
class UsersContainer extends PureComponent {
  static propTypes = {
    users: array
  }

  render = () => (
    <div className="users-container">
      <UsersList data={this.props.users}/>
    </div>
  )
}

export default UsersContainer
