import React from 'react'
import PropTypes from 'prop-types'

import Restaurant from '../Restaurant'

const RestaurantList = ({ data, onDestroy }) => {
  const map = data.map((restaurant) => (
    <Restaurant { ...restaurant } key={ 'restaurant_' + restaurant.id } onDestroy={ onDestroy } />
  ))

  return (
    <div className="restaurant-list">
      <legend>Restaurants</legend>
      { map }
    </div>
  )
}

const { string, bool, number, arrayOf, shape, func } = PropTypes

RestaurantList.propTypes = {
  data: arrayOf(
    shape({
      name: string,
      address: string,
      id: number,
      archive: bool
    })
  ).isRequired,
  onDestroy: func.isRequired
}

export default RestaurantList
