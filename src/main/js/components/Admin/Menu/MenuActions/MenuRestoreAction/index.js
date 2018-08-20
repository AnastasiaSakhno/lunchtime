import React from 'react'
import {bool, number, string, func} from 'prop-types'

import IconButton from '../../../../IconButton'

const PureMenuRestoreAction = (props) => {
  const handleRestore = (e) => {
    e.preventDefault()
    props.onRestore({...props})
  }

  return <IconButton icon={'fa-undo '} onSubmit={handleRestore}/>
}

PureMenuRestoreAction.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  weekDays: string.isRequired,
  archive: bool.isRequired,
  onRestore: func.isRequired
}

export default PureMenuRestoreAction
