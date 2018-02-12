import watchAuth from './auth'
import watchRestaurants from './restaurants'

export default function* rootSaga() {
  yield [watchAuth(), watchRestaurants()]
}
