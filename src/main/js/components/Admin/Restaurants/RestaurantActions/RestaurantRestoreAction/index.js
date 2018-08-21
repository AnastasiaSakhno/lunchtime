import React from 'react'
import {bool, number, string, func} from 'prop-types'

import IconButton from '../../../../IconButton'

const RestaurantRestoreAction = (props) => {
  const handleRestore = (e) => {
    e.preventDefault()
    props.onRestore({...props})
  }

  return <IconButton icon={'fa-undo '} onSubmit={handleRestore}/>
}

RestaurantRestoreAction.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  address: string.isRequired,
  archive: bool.isRequired,
  onRestore: func.isRequired
}

export default RestaurantRestoreAction
