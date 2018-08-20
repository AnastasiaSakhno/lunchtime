import auth from './auth'
import restaurants from './restaurants'
import users from './users'
import menu from './menu'
import menuDocuments from './menu_documents'
import usersMenu from './users_menu'
import days from './days'
import { sessionReducer } from 'redux-react-session'
import { combineReducers } from 'redux'

const reducers = combineReducers({
  auth, session: sessionReducer, restaurants, users, menu, menuDocuments, usersMenu, days
})

export default reducers


export const changeArchiveMethod = (item, id) => {
  if (item.id === id) {
    return { ...item, archive: !item.archive }
  }
  return item
}
