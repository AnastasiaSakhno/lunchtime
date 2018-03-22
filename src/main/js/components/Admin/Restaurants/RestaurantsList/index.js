import React from 'react'
import { string, bool, number, arrayOf, shape, func } from 'prop-types'

import { Restaurant } from '../../Restaurants'

const RestaurantsList = ({ data, onDestroy }) => {
  const map = data.map((restaurant) => (
    <Restaurant { ...restaurant } key={ `restaurant_${restaurant.id}` } onDestroy={ onDestroy } />
  ))

  return (
    <div className="restaurants-list">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col"/>
          </tr>
        </thead>
        <tbody>{map}</tbody>
      </table>
    </div>
  )
}

RestaurantsList.propTypes = {
  data: arrayOf(
    shape({
      id: number,
      name: string,
      address: string,
      archive: bool
    })
  ).isRequired,
  onDestroy: func.isRequired
}

export default RestaurantsList
