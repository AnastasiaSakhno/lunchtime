import React from 'react'
import {string, number} from 'prop-types'

const ArchiveRestaurant = ({name, address}) => (
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
