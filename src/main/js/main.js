import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import { Provider } from 'react-redux'
import configureStore from './utils/configureStore'
import { sessionService } from 'redux-react-session'

import App from './components/App'

const store = configureStore(false, window.initialData)

sessionService.initSessionService(store,
  { refreshOnCheckAuth: true, redirectPath: '/', driver: 'COOKIES' })

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('react')
)
