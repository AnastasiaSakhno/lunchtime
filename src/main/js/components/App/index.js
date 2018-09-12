import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {bool, func} from 'prop-types'
import { BrowserRouter } from 'react-router-dom'

import routes from '../routes'
import Footer from '../Footer'
import Header from '../Header'
import Alert from '../Alert'
import actions from '../../actions'
import {compose, branch, renderComponent, renderNothing} from 'recompose'
import {getCookie} from '../../utils/document'

const App = () => (
  <BrowserRouter>
    <div className='app'>
      <main className='container-fluid mt-5' role='main'>
        <Header/>
        <Alert/>
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
      </main>
      <Footer/>
    </div>
  </BrowserRouter>
)

App.propTypes = {
  authenticated: bool.isRequired,
  saveAuthData: func.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  saveAuthData: (authToken) => dispatch(actions.auth.saveAuthData(authToken))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(
    (props) => {
      if(!props.authenticated) {
        let authToken = getCookie('AUTH-TOKEN')
        if(authToken) {
          props.saveAuthData(authToken)
        }
      }
      return props.authenticated
    },
    renderComponent(App),
    renderNothing
  )
)()
