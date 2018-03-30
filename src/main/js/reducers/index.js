import auth from './auth'
import registrations from './registrations'
import restaurants from './restaurants'
import users from './users'
import menu from './menu'
import menuDocuments from './menu_documents'
import usersMenu from './users_menu'
import days from './days'
import { sessionReducer } from 'redux-react-session'
import { combineReducers } from 'redux'

const reducers = combineReducers({
  auth, registrations, session: sessionReducer, restaurants, users, menu, menuDocuments, usersMenu, days
})

export default reducers
