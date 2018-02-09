import Login from './Login'
import Home from './Home'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/login',
    component: Login
  }
]

export default routes
