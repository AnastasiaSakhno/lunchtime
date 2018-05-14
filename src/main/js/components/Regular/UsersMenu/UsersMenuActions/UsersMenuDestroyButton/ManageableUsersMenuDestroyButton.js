import React from 'react'
import {object, func} from 'prop-types'
import {connect} from 'react-redux'

import actions from '../../../../../actions'
import ActionButton from '../../../../ActionButton'

const ManageableUsersMenuDestroyButton = ({startDate, destroyTillDate}) => (
  <ActionButton text='Destroy previous' classes='destroy-old-udm' onSubmit={() => destroyTillDate(startDate)}/>
)

ManageableUsersMenuDestroyButton.propTypes = ({
  startDate: object.isRequired,
  destroyTillDate: func.isRequired
})

const mapDispatchToProps = dispatch => ({
  destroyTillDate: (startDate) => {
    if (confirm('Are you sure?')) {
      dispatch(actions.usersMenu.destroyTillDate(startDate))
    }
  }
})

export default connect(null, mapDispatchToProps)(ManageableUsersMenuDestroyButton)
