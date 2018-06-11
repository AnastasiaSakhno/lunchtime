import React from 'react'
import {bool, number, string, func} from 'prop-types'
import {compose} from 'recompose'

import IconButton from '../../../../IconButton'
import cancanBranch from '../../../../../HOC/branch/cancanBranch'
import {Menu} from '../../../../abilities'
import archiveBranch from '../../../../../HOC/branch/archiveBranch'

const PureMenuDestroyAction = (props) => {
  const handleDestroy = (e) => {
    e.preventDefault()
    props.onDestroy({...props})
  }

  return <IconButton icon={'fa-remove '} onSubmit={handleDestroy}/>
}

PureMenuDestroyAction.propTypes = {
  id: number,
  name: string,
  weekDays: string,
  archive: bool,
  onDestroy: func
}

export default compose(
  cancanBranch({
    VerifiableClass: Menu,
    CanComponent: PureMenuDestroyAction
  }),
  archiveBranch({
    NotArchiveComponent: PureMenuDestroyAction
  })
)()
