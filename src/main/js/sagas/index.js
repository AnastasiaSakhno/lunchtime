import watchAuth from './auth'
import watchRestaurants from './restaurants'
import watchUsers from './users'
import watchAuthorities from './authorities'
import watchMenu from './menu'
import watchMenuDocuments from './menu_documents'
import watchUsersMenu from './users_menu'
import watchDays from './days'
import watchConfig from './config'

export default function* rootSaga() {
  yield [
    watchAuth(),
    watchRestaurants(),
    watchUsers(),
    watchAuthorities(),
    watchMenu(),
    watchMenuDocuments(),
    watchUsersMenu(),
    watchDays(),
    watchConfig()
  ]
}
