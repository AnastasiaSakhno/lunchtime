import Login from './Login'
import Home from './Home'
import RestaurantContainer from './Admin/RestaurantContainer'

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
    component: RestaurantContainer
  }
]

export default routes
