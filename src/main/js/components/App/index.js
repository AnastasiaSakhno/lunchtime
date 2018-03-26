import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../routes'
import Footer from '../Footer'

const App = () => (
  <div className='app'>
    <main className='container-fluid mt-5' role='main'>
      <Switch>
        {routes.map((route, i) => <Route key={i} {...route} />)}
      </Switch>
    </main>
    <Footer/>
  </div>
)

export default App
