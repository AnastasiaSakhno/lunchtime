import React from 'react'
import {string, number, func} from 'prop-types'
import RestaurantRestoreAction from '../RestaurantActions/RestaurantRestoreAction'

const ArchiveRestaurant = (props) => (
  <tr>
    <td>
      <del>{props.name}</del>
    </td>
    <td>
      <del>{props.address}</del>
    </td>
    <td><RestaurantRestoreAction {...props}/></td>
  </tr>
)

ArchiveRestaurant.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  address: string.isRequired,
  onRestore: func.isRequired
}

export default ArchiveRestaurant
