import Login from './Login'
import Home from './Home'
import { RestaurantsContainer } from './Admin/Restaurants'
import { MenuContainer } from './Admin/Menu'

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
  },
  {
    path: '/admin/menu',
    component: MenuContainer
  }
]

export default routes
