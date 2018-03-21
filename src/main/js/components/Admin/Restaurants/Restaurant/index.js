import React from 'react'
import {string, bool, number, func} from 'prop-types'

import archiveBranch from '../../../../HOC/branch/archiveBranch'
import ArchiveRestaurant from './ArchiveRestaurant'
import RestaurantDestroyAction from '../RestaurantActions/RestaurantDestroyAction'

const PureRestaurant = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.address}</td>
    <td><RestaurantDestroyAction {...props}/></td>
  </tr>
)

PureRestaurant.propTypes = {
  id: number,
  name: string.isRequired,
  address: string,
  archive: bool.isRequired,
  onDestroy: func.isRequired
}

export default archiveBranch({
  ArchiveComponent: ArchiveRestaurant,
  NotArchiveComponent: PureRestaurant
})()
