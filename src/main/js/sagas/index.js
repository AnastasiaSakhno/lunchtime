import watchAuth from './auth'
import watchRestaurants from './restaurants'
import watchMenu from './menu'

export default function* rootSaga() {
  yield [
    watchAuth(),
    watchRestaurants(),
    watchMenu()
  ]
}
