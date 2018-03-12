import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../../actions'
import { RestaurantsList, RestaurantForm } from '../../Restaurants'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'

const { bool, array, func } = PropTypes

@withHeader
@withRedirectToLogin
class RestaurantsContainer extends PureComponent {
  static propTypes = {
    loadRestaurants: func.isRequired,
    addRestaurant: func.isRequired,
    removeRestaurant: func.isRequired,
    restaurants: array.isRequired,
    authenticated: bool.isRequired
  }

  componentDidMount() {
    if(this.props.authenticated) {
      this.props.loadRestaurants()
    }
  }

  render() {
    return (
      <div className="restaurants-container">
        <RestaurantForm onSubmit={ this.props.addRestaurant }/>
        <RestaurantsList
          data={ this.props.restaurants }
          onDestroy={ this.props.removeRestaurant } />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  restaurants: state.restaurants,
  authenticated: state.session.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  loadRestaurants: () => {
    dispatch(actions.restaurants.load())
  },
  addRestaurant: (restaurant) => {
    dispatch(actions.restaurants.add(restaurant))
  },
  removeRestaurant: (restaurant) => {
    dispatch(actions.restaurants.remove(restaurant))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsContainer)
