import React, {Component} from 'react'
import PropTypes from 'prop-types'
import withSpinner from '../../../../HOC/withSpinner'
import UsersMenuSheetStatistics from './UsersMenuSheetStatistics'
import UsersMenuSheetTable from './UsersMenuSheetTable'

@withSpinner(['startDate', 'currentUser', 'menuList'])
class UsersMenuSheet extends Component {
  render() {
    return (
      <div className='users-menu-sheet'>
        <UsersMenuSheetStatistics { ...this.props }/>
        <UsersMenuSheetTable { ...this.props }/>
      </div>
    )
  }
}

const {string, object, array, func} = PropTypes

UsersMenuSheet.propTypes = {
  startDate: string,
  data: array,
  onSubmit: func.isRequired,
  onUpdate: func.isRequired,
  onOutUpdate: func.isRequired,
  menuList: array.isRequired,
  users: array.isRequired,
  currentUser: object
}

export default UsersMenuSheet
