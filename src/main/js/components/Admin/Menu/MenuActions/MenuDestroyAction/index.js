import React from 'react'
import {bool, number, string, func} from 'prop-types'

import IconButton from '../../../../IconButton'

const PureMenuDestroyAction = (props) => {
  const handleDestroy = (e) => {
    e.preventDefault()
    props.onDestroy({...props})
  }

  return <IconButton icon={'fa-remove '} onSubmit={handleDestroy}/>
}

PureMenuDestroyAction.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  weekDays: string.isRequired,
  archive: bool.isRequired,
  onDestroy: func.isRequired
}

export default PureMenuDestroyAction
