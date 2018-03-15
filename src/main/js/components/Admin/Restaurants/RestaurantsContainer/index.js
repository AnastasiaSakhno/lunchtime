import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import actions from '../../../../actions'
import {RestaurantsList, RestaurantForm} from '../../Restaurants'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import withNeededStores from '../../../../HOC/withNeededStores'
import withCurrentUser from '../../../../HOC/withCurrentUser'
import {can, cancanUser, Restaurant} from '../../../abilities'

const {object, array, func} = PropTypes

@withNeededStores(['restaurants'])
@withRedirectToLogin
@withCurrentUser
@withHeader
class RestaurantsContainer extends PureComponent {
  static propTypes = {
    addRestaurant: func.isRequired,
    removeRestaurant: func.isRequired,
    restaurants: array,
    currentUser: object
  }

  render() {
    const user = cancanUser(this.props.currentUser)

    return (
      <div className="restaurants-container">
        {
          can(user, 'create', Restaurant)
            ? <div>
              <RestaurantForm onSubmit={this.props.addRestaurant}/>
              <hr/>
            </div>
            : ''
        }
        <RestaurantsList
          data={this.props.restaurants}
          onDestroy={this.props.removeRestaurant}/>
      </div>
    )
  }
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
