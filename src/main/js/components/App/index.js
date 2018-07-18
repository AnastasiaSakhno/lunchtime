import React from 'react'
import { Switch, Route } from 'react-router-dom'

import routes from '../routes'
import Footer from '../Footer'
import Header from '../Header'

const App = () => (
  <div className='app'>
    <main className='container-fluid mt-5' role='main'>
      <Header/>
      <Switch>
        {routes.map((route, i) => <Route key={i} {...route} />)}
      </Switch>
    </main>
    <Footer/>
  </div>
)

export default App
