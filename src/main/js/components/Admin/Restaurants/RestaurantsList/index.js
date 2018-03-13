import React from 'react'
import PropTypes from 'prop-types'

import { Restaurant } from '../../Restaurants'

const RestaurantsList = ({ data, onDestroy }) => {
  const map = data.map((restaurant) => (
    <Restaurant { ...restaurant } key={ `restaurant_${restaurant.id}` } onDestroy={ onDestroy } />
  ))

  return (
    <div className="restaurants-list">
      { map }
    </div>
  )
}

const { string, bool, number, arrayOf, shape, func } = PropTypes

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
