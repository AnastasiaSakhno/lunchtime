import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../actions'
import RestaurantList from './../RestaurantList'
import RestaurantForm from './../RestaurantForm'
import HeaderHOC from '../../../HOC/HeaderHOC'
import RedirectToLoginHOC from '../../../HOC/RedirectToLoginHOC'

const { bool, array, func } = PropTypes

@HeaderHOC
@RedirectToLoginHOC
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
        <RestaurantList
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
  addRestaurant: (link) => {
    dispatch(actions.restaurants.add(link))
  },
  removeRestaurant: (link) => {
    dispatch(actions.restaurants.remove(link))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsContainer)
