import auth from './auth'
import restaurants from './restaurants'
import users from './users'
import authorities from './authorities'
import menu from './menu'
import menuDocuments from './menu_documents'
import usersMenu from './users_menu'
import days from './days'
import alerts from './alerts'
import config from './config'
import { sessionReducer } from 'redux-react-session'
import { combineReducers } from 'redux'

const reducers = combineReducers({
  auth, session: sessionReducer, restaurants, users, authorities, menu, menuDocuments, usersMenu, days, alerts, config
})

export default reducers


export const updateStoreItemMethod = (item, newItem) => {
  if (item.id === newItem.id) {
    return { ...item, ...newItem }
  }
  return item
}
