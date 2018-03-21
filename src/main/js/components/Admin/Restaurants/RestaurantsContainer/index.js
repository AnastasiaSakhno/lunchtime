import React, {PureComponent} from 'react'
import {array, func} from 'prop-types'
import {connect} from 'react-redux'

import actions from '../../../../actions'
import {RestaurantsList, RestaurantForm} from '../../Restaurants'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import withNeededStores from '../../../../HOC/withNeededStores'

@withNeededStores(['restaurants'])
@withRedirectToLogin
@withHeader
class RestaurantsContainer extends PureComponent {
  static propTypes = {
    addRestaurant: func.isRequired,
    removeRestaurant: func.isRequired,
    restaurants: array
  }

  render = () => (
    <div className="restaurants-container">
      <RestaurantForm onSubmit={this.props.addRestaurant}/>
      <RestaurantsList
        data={this.props.restaurants}
        onDestroy={this.props.removeRestaurant}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addRestaurant: (restaurant) => {
    dispatch(actions.restaurants.add(restaurant))
  },
  removeRestaurant: (restaurant) => {
    dispatch(actions.restaurants.remove(restaurant))
  }
})

export default connect(null, mapDispatchToProps)(RestaurantsContainer)
