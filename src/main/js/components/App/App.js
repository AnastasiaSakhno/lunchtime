import React from 'react'
import PropTypes from 'prop-types'

const App = ({ children }) => (
  <div>
    {children}
  </div>
)

const { object } = PropTypes

App.propTypes = {
  children: object.isRequired
}

export default App
