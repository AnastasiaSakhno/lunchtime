import React from 'react'
import {string, bool, number, shape} from 'prop-types'

const ArchiveRestaurant = ({id, name, address}) => (
  <tr>
    <td>
      <del>{name}</del>
    </td>
    <td>
      <del>{address}</del>
    </td>
    <td/>
  </tr>
)

ArchiveRestaurant.propTypes = {
  id: number,
  name: string.isRequired,
  address: string
}

export default ArchiveRestaurant
