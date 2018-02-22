import watchAuth from './auth'
import watchRestaurants from './restaurants'
import watchMenu from './menu'
import watchMenuDocuments from './menu_documents'

export default function* rootSaga() {
  yield [
    watchAuth(),
    watchRestaurants(),
    watchMenu(),
    watchMenuDocuments()
  ]
}
