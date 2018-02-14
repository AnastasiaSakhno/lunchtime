import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../routes'
import Footer from '../Footer'

const App = () => {
  return (
    <div className='app'>
      <main role='main'>
        <div className='container'>
          <Switch>
            {routes.map((route, i) => <Route key={i} {...route} />)}
          </Switch>
        </div>
        <Footer/>
      </main>
    </div>
  )
}

export default App
