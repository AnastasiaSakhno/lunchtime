import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../../actions/index'
import MenuDocumentsList from '../MenuDocumentsList'
import HeaderHOC from '../../../../HOC/HeaderHOC/index'
import RedirectToLoginHOC from '../../../../HOC/RedirectToLoginHOC/index'

const { bool, array, func } = PropTypes

@HeaderHOC
@RedirectToLoginHOC
class MenuDocumentsContainer extends PureComponent {
  static propTypes = {
    loadMenuDocuments: func.isRequired,
    loadRestaurants: func.isRequired,
    submitMenuDocument: func.isRequired,
    menuDocuments: array.isRequired,
    restaurants: array.isRequired,
    authenticated: bool.isRequired
  }

  componentDidMount() {
    if(this.props.authenticated) {
      this.props.loadRestaurants()
      this.props.loadMenuDocuments()
    }
  }

  render() {
    let data = this.props.restaurants.map((restaurant) => {
      let found = this.props.menuDocuments.find((r) => (r.restaurantName === restaurant.name))
      return {
        ...found,
        restaurantName: restaurant.name
      }
    })
    return (
      <div className="menu-documents-container">
        <MenuDocumentsList
          data={ data }
          onSubmit={ this.props.submitMenuDocument } />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  menuDocuments: state.menuDocuments,
  restaurants: state.restaurants,
  authenticated: state.session.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  loadRestaurants: () => {
    dispatch(actions.restaurants.load())
  },
  loadMenuDocuments: () => {
    dispatch(actions.menuDocuments.load())
  },
  submitMenuDocument: (menuDocument) => {
    dispatch(actions.menuDocuments.upload(menuDocument))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuDocumentsContainer)
