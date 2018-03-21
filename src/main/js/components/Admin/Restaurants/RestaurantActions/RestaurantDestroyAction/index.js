import React from 'react'
import {bool, number, string, func} from 'prop-types'
import {compose} from 'recompose'

import IconButton from '../../../../IconButton'
import cancanBranch from '../../../../../HOC/branch/cancanBranch'
import {Restaurant} from '../../../../abilities'
import archiveBranch from '../../../../../HOC/branch/archiveBranch'

const PureRestaurantDestroyAction = (props) => {

  const handleDestroy = (e) => {
    e.preventDefault()
    props.onDestroy({...props})
  }

  return <IconButton icon={'fa-remove '} onSubmit={handleDestroy}/>
}

PureRestaurantDestroyAction.propTypes = {
  id: number,
  name: string,
  address: string,
  archive: bool,
  onDestroy: func
}

export default compose(
  cancanBranch({
    VerifiableClass: Restaurant,
    CanComponent: PureRestaurantDestroyAction
  }),
  archiveBranch({
    NotArchiveComponent: PureRestaurantDestroyAction
  })
)()
