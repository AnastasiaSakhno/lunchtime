import authReducer from './auth'
import { combineReducers } from 'redux'

const reducers = combineReducers({
  jwtReducer: authReducer
})

export default reducers
