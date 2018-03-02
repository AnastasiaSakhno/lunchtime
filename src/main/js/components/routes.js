import Login from './Login'
import { RestaurantsContainer } from './Admin/Restaurants'
import { MenuContainer } from './Admin/Menu'
import { MenuDocumentsContainer } from './Admin/MenuDocuments'
import { UsersMenuContainer } from './Regular/UsersMenu'
import { UsersContainer } from './Admin/Users'

const routes = [
  {
    path: '/',
    exact: true,
    component: UsersMenuContainer
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
  },
  {
    path: '/admin/menu_documents',
    component: MenuDocumentsContainer
  },
  {
    path: '/admin/users',
    component: UsersContainer
  }
]

export default routes
