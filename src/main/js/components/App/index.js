import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../routes'

const App = () => {
  return (
    <div className='container-fluid'>
      <Switch>
        {routes.map((route, i) => <Route key={i} {...route} />)}
      </Switch>
    </div>
  )
}

export default App
