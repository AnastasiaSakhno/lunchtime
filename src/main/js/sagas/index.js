import watchAuth from './auth'
import watchRegistrations from './registrations'
import watchRestaurants from './restaurants'
import watchUsers from './users'
import watchMenu from './menu'
import watchMenuDocuments from './menu_documents'
import watchUsersMenu from './users_menu'
import watchDays from './days'

export default function* rootSaga() {
  yield [
    watchAuth(),
    watchRegistrations(),
    watchRestaurants(),
    watchUsers(),
    watchMenu(),
    watchMenuDocuments(),
    watchUsersMenu(),
    watchDays()
  ]
}
