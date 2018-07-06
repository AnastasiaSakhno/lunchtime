import React from 'react'
import {compose, branch, renderComponent} from 'recompose'

import {isTokenExpired} from '../../utils/rest'
import {getCookie} from '../../utils/document'

export default ({LoginComponent, LogoutComponent}) =>
  compose(
    branch(
      (props) => {
        if(!props.authenticated) {
          let authToken = getCookie('AUTH-TOKEN')
          if(authToken/* && !isTokenExpired(authToken)*/) {
            props.saveAuthData(authToken)
          }
        }
        return props.authenticated
      },
      renderComponent(LogoutComponent),
      renderComponent(LoginComponent)
    )
  )
