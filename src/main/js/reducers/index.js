import auth from './auth'
import restaurants from './restaurants'
import { sessionReducer } from 'redux-react-session'
import { combineReducers } from 'redux'

const reducers = combineReducers({
  auth, session: sessionReducer, restaurants
})

export default reducers
