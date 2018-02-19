import Login from './Login'
import Home from './Home'
import { RestaurantsContainer } from './Admin/Restaurants'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin/restaurants',
    component: RestaurantsContainer
  }
]

export default routes
