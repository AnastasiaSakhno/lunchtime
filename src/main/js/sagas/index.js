import watchAuth from './auth'
import watchRestaurants from './restaurants'
import watchUsers from './users'
import watchMenu from './menu'
import watchMenuDocuments from './menu_documents'
import watchUsersMenu from './users_menu'
import watchDays from './days'

export default function* rootSaga() {
  yield [
    watchAuth(),
    watchRestaurants(),
    watchUsers(),
    watchMenu(),
    watchMenuDocuments(),
    watchUsersMenu(),
    watchDays()
  ]
}
