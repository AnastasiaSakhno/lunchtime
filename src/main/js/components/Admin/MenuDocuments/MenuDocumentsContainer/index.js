import React, {PureComponent} from 'react'
import {array, func} from 'prop-types'
import {connect} from 'react-redux'

import actions from '../../../../actions'
import MenuDocumentsList from '../MenuDocumentsList'
import withHeader from '../../../../HOC/withHeader'
import withRedirectToLogin from '../../../../HOC/withRedirectToLogin'
import withNeededStores from '../../../../HOC/withNeededStores'

@withNeededStores(['restaurants', 'menuDocuments'])
@withRedirectToLogin
@withHeader
class MenuDocumentsContainer extends PureComponent {
  static propTypes = {
    submitMenuDocument: func.isRequired,
    menuDocuments: array,
    restaurants: array
  }

  render = () => (
    <div className="menu-documents-container">
      <MenuDocumentsList
        data={this.props.menuDocuments}
        onSubmit={this.props.submitMenuDocument}/>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  submitMenuDocument: (menuDocument) => {
    dispatch(actions.menuDocuments.upload(menuDocument))
  }
})

export default connect(null, mapDispatchToProps)(MenuDocumentsContainer)
