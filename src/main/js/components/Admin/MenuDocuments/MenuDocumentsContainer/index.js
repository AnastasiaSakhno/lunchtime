import React, {PureComponent} from 'react'
import {array, func} from 'prop-types'
import {connect} from 'react-redux'

import actions from '../../../../actions'
import MenuDocumentsList from '../MenuDocumentsList'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import withNeededStores from '../../../../HOC/withNeededStores'
import selectors from '../../../../selectors'

@withNeededStores(['restaurants', 'menuDocuments'])
@withRedirectToLogin
@withHeader
class MenuDocumentsContainer extends PureComponent {
  static propTypes = {
    submitMenuDocument: func.isRequired,
    menuDocuments: array,
    restaurants: array,
    activeRestaurants: array
  }

  render() {
    let data = this.props.activeRestaurants.map((restaurant) => {
      let found = this.props.menuDocuments.find((r) => (r.restaurant.name === restaurant.name))
      return {
        ...found,
        restaurant: restaurant
      }
    })

    return (
      <div className="menu-documents-container">
        <MenuDocumentsList
          data={data}
          onSubmit={this.props.submitMenuDocument}/>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  activeRestaurants: selectors.restaurants.active(state)
})

const mapDispatchToProps = (dispatch) => ({
  submitMenuDocument: (menuDocument) => {
    dispatch(actions.menuDocuments.upload(menuDocument))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuDocumentsContainer)
