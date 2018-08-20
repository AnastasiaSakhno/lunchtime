import React from 'react'
import {compose, branch, renderComponent} from 'recompose'

import {isTokenExpired} from '../../utils/rest'
import {getCookie} from '../../utils/document'

const DefaultLoginComponent = () => <none/>

export default ({LoginComponent = DefaultLoginComponent, LogoutComponent}) =>
  compose(
    branch(
      (props) => {
        if(!props.authenticated) {
          let authToken = getCookie('AUTH-TOKEN')
          if(authToken && !isTokenExpired(authToken)) {
            props.saveAuthData(authToken)
          }
        }
        return props.authenticated
      },
      renderComponent(LogoutComponent),
      renderComponent(LoginComponent)
    )
  )
