import React, {PureComponent} from 'react'
import {array, func} from 'prop-types'
import {connect} from 'react-redux'

import actions from '../../../../actions'
import {RestaurantsList, RestaurantForm} from '../../Restaurants'
import withNeededStores from '../../../../HOC/withNeededStores'

@withNeededStores(['users', 'restaurants'])
class RestaurantsContainer extends PureComponent {
  static propTypes = {
    addRestaurant: func.isRequired,
    removeRestaurant: func.isRequired,
    restoreRestaurant: func.isRequired,
    restaurants: array
  }

  render = () => (
    <div className="restaurants-container">
      <RestaurantForm onSubmit={this.props.addRestaurant}/>
      <RestaurantsList
        data={this.props.restaurants}
        onDestroy={this.props.removeRestaurant}
        onRestore={this.props.restoreRestaurant}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addRestaurant: (restaurant) => dispatch(actions.restaurants.add(restaurant)),
  removeRestaurant: (restaurant) => dispatch(actions.restaurants.remove(restaurant)),
  restoreRestaurant: (restaurant) => dispatch(actions.restaurants.restore(restaurant))
})

export default connect(null, mapDispatchToProps)(RestaurantsContainer)
