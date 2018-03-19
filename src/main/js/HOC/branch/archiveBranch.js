import React from 'react'
import {branch, renderComponent} from 'recompose'

const DefaultArchiveComponent = () => <none/>

export default ({ArchiveComponent = DefaultArchiveComponent, NotArchiveComponent}) =>
  branch(
    (props) => props.archive,
    renderComponent(ArchiveComponent),
    renderComponent(NotArchiveComponent)
  )
