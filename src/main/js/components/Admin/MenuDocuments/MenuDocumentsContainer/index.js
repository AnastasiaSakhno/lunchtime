import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../../actions'
import MenuDocumentsList from '../MenuDocumentsList'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import withNeededStores from '../../../../HOC/withNeededStores'

const { array, func } = PropTypes

@withNeededStores(['restaurants', 'menuDocuments'])
@withRedirectToLogin
@withHeader
class MenuDocumentsContainer extends PureComponent {
  static propTypes = {
    submitMenuDocument: func.isRequired,
    menuDocuments: array,
    restaurants: array
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

const mapDispatchToProps = (dispatch) => ({
  submitMenuDocument: (menuDocument) => {
    dispatch(actions.menuDocuments.upload(menuDocument))
  }
})

export default connect(null, mapDispatchToProps)(MenuDocumentsContainer)
