import auth from './auth'
import restaurants from './restaurants'
import menu from './menu'
import menuDocuments from './menu_documents'
import usersMenu from './users_menu'
import { sessionReducer } from 'redux-react-session'
import { combineReducers } from 'redux'

const reducers = combineReducers({
  auth, session: sessionReducer, restaurants, menu, menuDocuments, usersMenu
})

export default reducers
