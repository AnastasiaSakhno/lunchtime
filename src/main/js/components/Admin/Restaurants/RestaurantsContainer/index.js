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
    updateRestaurant: func.isRequired,
    restaurants: array
  }

  render = () => (
    <div className="restaurants-container">
      <RestaurantForm onSubmit={this.props.addRestaurant}/>
      <RestaurantsList
        data={this.props.restaurants}
        onDestroy={(r) => this.props.updateRestaurant({...r, archive: true})}
        onRestore={(r) => this.props.updateRestaurant({...r, archive: false})}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addRestaurant: (restaurant) => dispatch(actions.restaurants.add(restaurant)),
  updateRestaurant: (restaurant) => dispatch(actions.restaurants.update(restaurant))
})

export default connect(null, mapDispatchToProps)(RestaurantsContainer)
