import React, {Component} from 'react'
import {string, object, array, func} from 'prop-types'

import withSpinner from '../../../../HOC/withSpinner'
import UsersMenuSheetSummary from './UsersMenuSheetSummary'
import UsersMenuSheetTable from './UsersMenuSheetTable'

@withSpinner(['startDate', 'menuList'])
class UsersMenuSheet extends Component {
  render = () => (
    <div className='users-menu-sheet'>
      <UsersMenuSheetSummary {...this.props}/>
      <UsersMenuSheetTable {...this.props}/>
    </div>
  )
}

UsersMenuSheet.propTypes = {
  menuList: array.isRequired,
  activeMenu: array.isRequired,
  startDate: string,
  dataGroupedByUser: object,
  days: array,
  orderedUsers: array.isRequired,
  summaryValues: array,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  onOutUpdate: func.isRequired
}

export default UsersMenuSheet
